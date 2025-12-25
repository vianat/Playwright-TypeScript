import {FullConfig} from "@playwright/test";
// @ts-ignore
import path from 'path';
// @ts-ignore
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
    if (process.env.RUNNER?.toUpperCase() === 'LOCAL' ) {
        // Delete allure results
        const resultsDir = path.resolve(process.cwd(), "allure-results");
        console.log("------------------------");

        if (fs.existsSync(resultsDir)) {
            fs.rmSync(resultsDir, {recursive: true, force: true});
        }
    }
}