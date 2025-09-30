document.addEventListener('keydown', e =>
{
        // block typing until the prompt is fully printed
    if (inputEnabled == false) 
    {
        return
    }

    if (e.key === 'Backspace')
    {
        e.preventDefault()
        if (inputTarget.textContent.length > 0)
        {
            inputTarget.textContent = inputTarget.textContent.slice(0, -1)
        }
        return
    }

    if (e.key === 'Enter')
    {
        e.preventDefault()
        const value = inputTarget.textContent
            // console verification
        console.log('Entered password:', value)

        // TODO: show ACCESS DENIED, glitch, etc.
        if (typeof resume === 'function') resume()
        {
            return
        }
    }

        // type only printable characters
    if (e.key.length === 1)
    {
        e.preventDefault()
        inputTarget.textContent += e.key
    }
})