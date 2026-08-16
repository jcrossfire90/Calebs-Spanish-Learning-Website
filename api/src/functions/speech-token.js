const { app } = require("@azure/functions");

app.http("speech-token", {
    methods: ["GET"],
    authLevel: "anonymous",

    handler: async (request, context) => {
        const speechKey = process.env.SPEECH_KEY;
        const speechRegion = process.env.SPEECH_REGION;

        if (!speechKey || !speechRegion) {
            return {
                status: 500,
                jsonBody: {
                    error: "Speech configuration missing."
                }
            };
        }

        try {
            const response = await fetch(
                `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
                {
                    method: "POST",
                    headers: {
                        "Ocp-Apim-Subscription-Key": speechKey,
                        "Content-Length": "0"
                    }
                }
            );

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const token = await response.text();

            return {
                jsonBody: {
                    token,
                    region: speechRegion
                }
            };
        } catch (err) {
            context.error(err);

            return {
                status: 500,
                jsonBody: {
                    error: err.message
                }
            };
        }
    }
});