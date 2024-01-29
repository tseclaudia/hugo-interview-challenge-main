function CreateApplication() {
    
    const handleClick = async () => {
        try {
        const response = await fetch('http://localhost:8000/applications/create', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { linkTo } = await response.json();

        window.location.href = linkTo;
        } catch (error) {
        console.error('Error creating application:', error);
        }
      };

    return (
        <button type="button" onClick={handleClick}>
            Create New Application
        </button>
    );
}

export default CreateApplication; 