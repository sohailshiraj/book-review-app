# Project: Book Review & Recommendation App

## Setup and run instructions for both the backend and frontend.

### Pre requisite

1. Node.js should be installed.

### Steps

1. Clone the repo
2. run `npm run build:all` on root.
3. run `npm run start:backend` on root.
4. Open another cmd and run `npm run start:frontend`

## Design decisions

1. Implemented server-side pagination to improve performance and scalability. The frontend sends page and pageSize parameters to the server.
2. Used Material-UI's Grid component to ensure the layout is responsive and works well on different screen sizes.
3. Integrated react-toastify to provide immediate feedback to the user for success and error messages.

## Assumptions

1. The dataset is large, so server-side filtering and sorting are implemented for better scalability and performance.
2. Users expect accurate and up-to-date results when applying filters or sorting, which is best handled on the server side.
3. The backend API is designed to handle filtering, sorting, and pagination efficiently.
4. Pagination is implemented on the server side to handle large datasets.
