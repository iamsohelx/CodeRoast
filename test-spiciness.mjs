const codeToRoast = `
function add(a, b) {
  return a + b;
}
`;

async function testSpiciness(level) {
    console.log(`\n--- Testing Level: ${level.toUpperCase()} ---`);
    try {
        const response = await fetch("http://localhost:3000/api/roast", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: codeToRoast, spiciness: level }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`API Error: ${response.status} ${text}`);
        }

        const data = await response.json();
        console.log(`Pain Score: ${data.pain_score}`);
        console.log(`Roast: ${data.roast}`);

    } catch (error) {
        console.error("Test failed:", error.message);
    }
}

async function runTests() {
    console.log("Starting Spiciness Test...");
    await testSpiciness("junior");
    await testSpiciness("senior");
    await testSpiciness("savage");
    console.log("\n--- Test Complete ---");
}

runTests();
