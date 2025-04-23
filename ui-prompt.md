I need a dark-themed dashboard UI for AgentSpace, a platform where businesses can register AI agents and end-users can interact with them, including agent-to-agent communication. The UI should focus on a chat interface as the main feature, with a sidebar on the left for navigation. Below are the detailed requirements:

User Flows:





Business Registering an Agent:





Login with business account (Email: "business@example.com", Password: "password123").



Navigate to "Register Agent" in the sidebar.



Fill out a form with fields: Agent Name (e.g., "TradeMaster"), Description (e.g., "Executes crypto trades based on user requests."), Category (dropdown: Trading, Analysis, Other), API Endpoint (e.g., "https://example.com/trade").



Submit the form and see the agent listed in the "Agents" section.



End-User Interacting with a Single Agent:





Login with user account (Email: "user@example.com", Password: "password123", Initial Points: 100).



Go to "Agents" in the sidebar, browse and select an agent (e.g., "TradeMaster").



In the chat interface, select the agent from a dropdown, enter a request (e.g., "Buy 0.1 BTC"), and click "Send."



View the agent's response (e.g., "Trade executed at $60,000") in a readonly textarea.



Check the updated points balance (e.g., 90 points after a 10-point deduction).



End-User Triggering an Agent-to-Agent (A2A) Scenario:





Login with user account.



Select an agent that supports A2A (e.g., "TradeMaster").



Send a request that triggers A2A (e.g., "Buy 0.1 BTC").



View the combined response (e.g., "Price: $60,000. Trade executed.") from multiple agents.



Check the updated points balance (e.g., 85 points after a 15-point deduction) and see transaction details.



Admin Viewing Usage Logs:





Login with admin account (Email: "admin@agentspace.com", Password: "password123").



Navigate to "Usage Logs" in the sidebar.



View a table of logs with columns: Timestamp, User ID, Agent ID(s), Request, Response, Points Spent.



Filter logs by user or agent.

UI Layout:





Left Sidebar:





Navigation options: "Dashboard", "Agents", "Register Agent" (visible only for businesses), "Usage Logs" (visible only for admin), "Profile."



Darker background (#2C2C2C) with white text.



Main Content Area:





Displays the selected page or the chat interface.



For the chat interface:





Dropdown to select an agent.



Text input for user requests (max 100 characters).



"Send" button.



Readonly textarea to display agent responses.



Section below for request history (last 5 requests and responses).



Top Bar:





Platform logo on the left.



User profile dropdown on the right with options: "Profile", "Logout."

Dark Theme:





Background: Dark gray (#1E1E1E)



Text: Light gray (#E0E0E0)



Accents: Blue (#3498DB) for buttons and highlights



Sidebar: Darker shade (#2C2C2C) with white text

Dummy Data:





Agents:





TradeMaster (Category: Trading, Description: "Executes crypto trades based on user requests.", API Endpoint: "https://example.com/trade")



MarketAnalyzer (Category: Analysis, Description: "Provides real-time crypto market analysis.", API Endpoint: "https://example.com/analyze")



PortfolioOptimizer (Category: Other, Description: "Optimizes crypto investment portfolios.", API Endpoint: "https://example.com/optimize")



Users:





Business User: Email: "business@example.com", Password: "password123"



End-User: Email: "user@example.com", Password: "password123", Initial Points: 100



Admin: Email: "admin@agentspace.com", Password: "password123"

Additional Requirements:





The UI should be responsive, with a grid layout for the agent directory (2 columns on desktop, 1 on mobile).



Use Tailwind CSS for styling.



Include a login modal that appears when accessing restricted pages.



Simulate API responses for agent interactions (e.g., "Trade executed at $60,000" for TradeMaster).



For A2A scenarios, display responses from both agents in sequence with a "Powered by A2A" badge.

Please generate the complete UI with all specified user flows, dummy data, and a dark theme, ensuring the chat interface is the central feature of the dashboard.