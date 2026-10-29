import {defineConfig} from '@playwright/test';
export default defineConfig({timeout:90000,testDir:'tests',use:{baseURL:'http://127.0.0.1:4173',launchOptions:{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}},webServer:{command:'npm.cmd run preview -- --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:false}});
