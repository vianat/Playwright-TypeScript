import {test, expect, request} from "@playwright/test";

test.describe("REST api ", () => {
    const baseUrl = "https://reqres.in/api";

    // GET
    test("Should get list of users", async ({request}) => {
        const result = await request.get(`${baseUrl}/users?page=2`, {
            headers: {
                "x-api-key": "reqres-free-v1"
            }
        });

        const responseData = await result.json();
        console.log(JSON.stringify(responseData));

        expect(result.status()).toBe(200);
    });

    // POST
    test("Should create a user", async ({request}) => {
        const payload = {
            'name': "John Doe",
            'job': "fufel"
        };

        const result = await request.post(`${baseUrl}/users`, {
            headers: {
                "x-api-key": "reqres-free-v1",
                'Content-Type': 'application/json'
            },
            data: payload
        });

        const responseData = await result.json();
        console.log(JSON.stringify(responseData));

        expect(result.status()).toBe(201);
    });
});