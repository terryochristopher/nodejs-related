const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager"); // CommonJS import

async function getSecret(secret_name) {
    const client = new SecretsManagerClient({
        region: process.env.AWS_SM_REGION
    });

    const input = { // GetSecretValueRequest
        SecretId: secret_name, // required
        VersionStage: "AWSCURRENT",
    };
    let response;
    try {
        response = await client.send(
        new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
        );
    } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw error;
    }
    const command = new GetSecretValueCommand(input);
    const results = await client.send(command);
    const secret = JSON.parse(results.SecretString);
    return secret;
}
module.exports = {
    getSecret,
}