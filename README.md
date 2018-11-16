# Open Sesame
Open Sesame's purpose is simple: to prevent garage doors from excessively remaining open.

## Backend
The backend is an express.js server that executes BACnet commands needed to do a couple things:

1. Trigger garage door open/close
2. Retrieve status as to whether the door is open or closed



### TODO
- BACnet command to initiate garage door movement
- BACnet command to retrieve status of garage being open (This is a discrete status - if not closed, then it is open - it does not indicate how far the door is open)
- Configuration for local BACnet addressing (the server running the web application)
- Configuration for remote BACnet addressing (the device that interacts with the garage door)
- HTTP endpoints for initiating garage door movement