document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ticket-form');
    const ticketList = document.getElementById('ticket-list');

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
            loadTickets();
        } else {
            alert('Failed to create ticket');
        }
    });

    async function loadTickets() {
        const response = await fetch('http://localhost:3000/api/tickets');
        if (response.ok) {
            const tickets = await response.json();
            ticketList.innerHTML = '';
            tickets.forEach(ticket => {
                const li = document.createElement('li');
                li.textContent = `Natureza: ${ticket.natureza}, Descrição: ${ticket.descricao}, Provedor: ${ticket.provedor}`;
                ticketList.appendChild(li);
            });
        } else {
            console.error('Failed to fetch tickets');
        }
    }

    loadTickets();
});
