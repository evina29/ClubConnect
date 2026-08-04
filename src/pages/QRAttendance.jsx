import React, { useState, useEffect, useRef } from 'react';
import { generateEventQRCode, markAttendance, validateQRCode } from '../services/qrCodeService';
import { useAuth } from '../context/AuthContext';
import './QRAttendance.css';

const QRAttendance = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState('scan');
  const [qrCode, setQrCode] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const detectorRef = useRef(null);
  const scanIntervalRef = useRef(null);

  const events = [
    { id: 'evt0', name: 'BPA Meeting', clubId: 'bpa', date: 'Today, 1:40 PM' },
    { id: 'evt1', name: 'Robotics Workshop', clubId: 'robotics', date: 'Today, 3:00 PM' },
    { id: 'evt2', name: 'Chess Tournament', clubId: 'chess', date: 'Tomorrow, 4:00 PM' },
    { id: 'evt3', name: 'Drama Rehearsal', clubId: 'drama', date: 'Friday, 6:00 PM' },
  ];

  useEffect(() => {
    setQrCode(null);
  }, [selectedEvent]);

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handleGenerateQR = async () => {
    if (!selectedEvent) return;
    const event = events.find((e) => e.id === selectedEvent);
    const qrCodeImage = await generateEventQRCode(event.id, event.clubId);
    setQrCode(qrCodeImage);
  };

  const handleScanQR = () => {
    setScanResult(null);
    setScanning(true);

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        if (window.BarcodeDetector) {
          try {
            const formats = await BarcodeDetector.getSupportedFormats();
            if (formats.includes('qr_code')) {
              detectorRef.current = new BarcodeDetector({ formats: ['qr_code'] });
            }
          } catch (e) {
            /* ignore */
          }
        }

        scanIntervalRef.current = setInterval(async () => {
          try {
            if (detectorRef.current && videoRef.current) {
              const detections = await detectorRef.current.detect(videoRef.current);
              if (detections?.length > 0) handleDetected(detections[0].rawValue);
            } else if (videoRef.current && canvasRef.current && window.BarcodeDetector) {
              const ctx = canvasRef.current.getContext('2d');
              canvasRef.current.width = videoRef.current.videoWidth;
              canvasRef.current.height = videoRef.current.videoHeight;
              ctx.drawImage(videoRef.current, 0, 0);
              try {
                const imgBitmap = await createImageBitmap(canvasRef.current);
                const det = new BarcodeDetector({ formats: ['qr_code'] });
                const results = await det.detect(imgBitmap);
                if (results?.length > 0) handleDetected(results[0].rawValue);
              } catch (e) {
                /* no-op */
              }
            }
          } catch (err) {
            /* ignore */
          }
        }, 500);
      } catch (err) {
        setScanResult({ success: false, message: 'Camera access denied or not available' });
        setScanning(false);
      }
    };

    start();
  };

  const stopScanning = () => {
    setScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    detectorRef.current = null;
  };

  const handleDetected = (rawValue) => {
    const validation = validateQRCode(rawValue);
    if (!validation.valid) {
      setScanResult({ success: false, message: validation.reason || 'Invalid QR code' });
      stopScanning();
      return;
    }
    const { data } = validation;
    markAttendance(user?.id || 'anon', data.eventId, data.clubId);
    setScanResult({ success: true, message: 'You’re checked in', points: 10 });
    stopScanning();
  };

  return (
    <div className="qr-page">
      <header className="qr-page__header">
        <h1 className="qr-page__title">QR check-in</h1>
        <p className="qr-page__subtitle">
          Scan a code to check in, or create one for your event.
        </p>
      </header>

      <div className="qr-page__card">
        <div className="qr-segment" role="tablist" aria-label="Mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'scan'}
            className={`qr-segment__btn${mode === 'scan' ? ' qr-segment__btn--active' : ''}`}
            onClick={() => {
              setMode('scan');
              setScanResult(null);
            }}
          >
            Scan
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'generate'}
            className={`qr-segment__btn${mode === 'generate' ? ' qr-segment__btn--active' : ''}`}
            onClick={() => setMode('generate')}
          >
            Host
          </button>
        </div>

        {mode === 'scan' && (
          <div className="qr-panel">
            <div className="qr-scan-box">
              {!scanning && !scanResult && (
                <div className="qr-scan-placeholder">
                  <span className="qr-scan-placeholder__icon" aria-hidden="true">
                    📷
                  </span>
                  <p className="qr-scan-placeholder__text">
                    Point your camera at the event QR code.
                  </p>
                  <button type="button" className="qr-btn qr-btn--primary" onClick={handleScanQR}>
                    Open camera
                  </button>
                </div>
              )}

              {scanning && (
                <div className="qr-camera">
                  <video ref={videoRef} className="qr-camera__video" playsInline muted />
                  <canvas ref={canvasRef} className="qr-camera__canvas" aria-hidden="true" />
                  <div className="qr-camera__overlay">
                    <div className="qr-camera__frame" />
                  </div>
                  <button type="button" className="qr-btn qr-btn--ghost qr-camera__stop" onClick={stopScanning}>
                    Cancel
                  </button>
                </div>
              )}

              {scanResult && (
                <div className={`qr-result ${scanResult.success ? 'qr-result--ok' : 'qr-result--bad'}`}>
                  <span className="qr-result__icon" aria-hidden="true">
                    {scanResult.success ? '✓' : '✕'}
                  </span>
                  <p className="qr-result__msg">{scanResult.message}</p>
                  {scanResult.success && (
                    <span className="qr-result__pts">+{scanResult.points} pts</span>
                  )}
                  <button
                    type="button"
                    className="qr-btn qr-btn--secondary"
                    onClick={() => setScanResult(null)}
                  >
                    Scan again
                  </button>
                </div>
              )}
            </div>

            <details className="qr-details">
              <summary className="qr-details__summary">How scanning works</summary>
              <ul className="qr-details__list">
                <li>Get the QR from your organizer or screen.</li>
                <li>Allow camera when prompted.</li>
                <li>Hold steady until check-in confirms.</li>
              </ul>
            </details>
          </div>
        )}

        {mode === 'generate' && (
          <div className="qr-panel">
            <label className="qr-label" htmlFor="qr-event-select">
              Event
            </label>
            <select
              id="qr-event-select"
              className="qr-select"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="">Choose an event…</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name} · {event.date}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="qr-btn qr-btn--primary qr-btn--block"
              onClick={handleGenerateQR}
              disabled={!selectedEvent}
            >
              Create check-in code
            </button>

            {qrCode && (
              <div className="qr-output">
                <div className="qr-output__frame">
                  <img src={qrCode} alt="Check-in QR code for selected event" />
                </div>
                <p className="qr-output__status">Code ready — show this to attendees.</p>
                <p className="qr-output__hint">Expires in 15 minutes for security.</p>
                <div className="qr-output__actions">
                  <button type="button" className="qr-btn qr-btn--ghost qr-btn--half">
                    Download
                  </button>
                  <button type="button" className="qr-btn qr-btn--ghost qr-btn--half">
                    Share
                  </button>
                </div>
              </div>
            )}

            <details className="qr-details">
              <summary className="qr-details__summary">Tips for hosts</summary>
              <ul className="qr-details__list">
                <li>Create the code before people arrive.</li>
                <li>Display full-screen or print large.</li>
                <li>Regenerate if the window expires.</li>
              </ul>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRAttendance;
