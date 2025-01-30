### EMDB

This is a Good Read's style application for reviewing and collecting movies. User's can curate collections of movies, review movies, and send their collections to friends. Think a hyrbid between Letterboxd, Good Reads, and sharing Spotify playlists.

## Information

This is a React project built with Vite that uses the following tools and technologies:

- AWS Amplify backend
- AWS Cognito for authentication
- OMDB Movie API for retrieving movie data
- Shadcn components
- Tailwind styling

## Installation

- Clone the repo
- Run `npm install`
- Ensure you have AWS CLI tools installed (will have to run an Admin session for sudo permissions) and AWS Amplify CLI tools installed
- Run `aws configure` to login to AWS account
- To generate the Amplify config JSON file, run `amplify pull --appId YOUR_APP_ID --envName YOUR_ENV_NAME`


## Running the project lcoally

- Ensure you have run `npm run sandbox` to generate a sandbox environment in AWS which allows you to run the project locally against the sandbox
- Run `npm run dev` to run the frontend locally


## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.