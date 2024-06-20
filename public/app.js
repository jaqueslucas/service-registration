document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ticket-form');
    const ticketList = document.getElementById('ticket-list');
    const listProviderSelect = document.getElementById('list-provider');
    const listTicketsButton = document.getElementById('list-tickets-button');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const natureza = document.getElementById('natureza').value;
        const descricao = document.getElementById('descricao').value;
        const provedor = document.getElementById('provedor').value;

        const response = await fetch('http://localhost:3000/api/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ natureza, descricao, provedor }),
        });

        if (response.ok) {
            alert('Ticket created successfully');
            form.reset();
        } else {
            alert('Failed to create ticket');
        }
    });

    listTicketsButton.addEventListener('click', async function() {
        const provider = listProviderSelect.value;
        await loadTicketsByProvider(provider);
    });

    async function loadTicketsByProvider(provider) {
        try {
            const response = await fetch(`http://localhost:3000/api/tickets/list?provider=${provider}`);
            if (response.ok) {
                const tickets = await response.json();
                ticketList.innerHTML = '';
                tickets.forEach(ticket => {
                    const li = document.createElement('li');
                    li.textContent = `Natureza: ${ticket.natureza}, Descrição: ${ticket.descricao}, Provedor: ${ticket.provedor}`;
                    ticketList.appendChild(li);
                });
            } else {
                console.error('Failed to fetch tickets', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching tickets', error);
        }
    }
});
