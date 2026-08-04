<p align="center">
  <img src="public/clubconnect-mark.png" alt="ClubConnect logo" width="180" />
</p>

<h1 align="center">ClubConnect</h1>

<p align="center">One friendly home for everything happening in your school clubs.</p>

## What it is

ClubConnect is a web app that helps students actually stay connected to the clubs they care about. Instead of losing track of meetings in group chats, missing sign up forms, and forgetting which events you said you would go to, everything lives in one place. You can browse clubs, join the ones you like, see what is coming up on a shared calendar, check in to events with a QR code, chat with other members, and watch your involvement add up over time.

I wanted it to feel less like a boring school portal and more like something you would genuinely want to open. So it has a soft pastel look, a little onboarding flow, some gamification with points and badges, and even a couple of helpful chatbots that guide you around the app and make it easier to use.

## What you can do with it

Here are the main things ClubConnect does today:

- Browse and join clubs, and open a full page for each one with its details and members
- See every event on a shared calendar and open individual event pages
- Check in to events instantly with QR code attendance
- Earn points and badges as you show up and take part, with a gamification page to track it all
- View analytics and charts about engagement and activity
- Post to a social feed, send messages, and get notifications
- Build a student portfolio that keeps a record of everything you have been involved in
- Run votes and polls, and organize club projects
- Switch languages on the fly, with support for English, Spanish, French, Chinese, and Arabic
- Use built in accessibility tools and a navigation helper so the app works for everyone
- Install it like an app on your phone, since it is a Progressive Web App

## Try it out

You will need [Node.js](https://nodejs.org/) installed. Then, from the project folder:

```bash
npm install
npm run dev
```

Now open this exact address in your browser:

```
http://localhost:5173/Club-Connect/
```

That last part, `/Club-Connect/`, matters. The app is set up to live under that path, so plain `http://localhost:5173/` will not load it.

Want a production build instead?

```bash
npm run build
npm run preview
```

## Tools and technologies

The app is built with React and Vite, with a handful of libraries doing the heavy lifting for the bigger features:

- **React 18 and React Router** for the interface and page navigation
- **Vite** as the build tool and dev server
- **Firebase** for authentication and the Firestore database
- **Chart.js** with react-chartjs-2 for the analytics graphs
- **qrcode** for generating the event check in codes
- **date-fns** for handling dates on the calendar
- **Spline** for the 3D graphics on the landing pages

## What inspired it

The idea came from watching how messy club life gets at school. Sign ups happen on paper, reminders get buried in group chats, attendance is tracked in random spreadsheets, and it is genuinely hard for a new student to figure out what clubs even exist. I thought all of that could live in one clean, welcoming app that students actually enjoy using.

So I set out to build the tool I wished my school had. Something that makes joining a club feel easy, keeps everyone in the loop, and quietly rewards you for staying involved. ClubConnect is my take on that.

## A note

This is a student project and it is very much a work in progress, so if you poke around and find something rough, that is part of the fun. Feel free to explore it, break it, and make it your own.
