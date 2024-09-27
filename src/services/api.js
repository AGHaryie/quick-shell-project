export const fetchTickets = async () => {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    const data = await response.json();
    return data.tickets; // Return the tickets array
  };
  
  export const fetchUsers = async () => {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    const data = await response.json();
    return data.users; // Return the users array
  };
  