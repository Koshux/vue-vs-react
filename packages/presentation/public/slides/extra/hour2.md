Hour 2: Hands-On Use Case 2

Real-time Dashboard

The Concept

Display data that updates live without requiring the user to refresh the page. This is essential for monitoring systems, financial tickers, live sports scores, etc.

--

Core Technologies

WebSockets: A persistent, two-way communication channel between the client and server. The server can "push" data to the client at any time.

Chart Libraries:

Vue: vue-chartjs (a simple wrapper around Chart.js) or ECharts.

React: Recharts or ECharts.

State Management: Critical for handling the incoming stream of data and efficiently updating the UI.

--

Workshop Goal

Connect to a public WebSocket stream (e.g., for live cryptocurrency prices).

Listen for incoming data messages.

Update a Pinia/Redux store with the new data.

Watch the chart re-render automatically as new data arrives.
