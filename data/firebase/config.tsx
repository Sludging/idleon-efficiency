import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';

export const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyAU62kOE6xhSrFqoXQPv6_WHxYilmoUxDk",
    authDomain: "idlemmo.firebaseapp.com",
    databaseURL: "idlemmo.firebaseio.com",
    projectId: "idlemmo",
};

const app = getApps().some((existingApp) => existingApp.name === '[DEFAULT]')
    ? getApp()
    : initializeApp(firebaseConfig);

export default app;
