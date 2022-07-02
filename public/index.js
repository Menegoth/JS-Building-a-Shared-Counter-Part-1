async function main(){
    const countContainer = document.querySelector('#count-container');
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');
    const refreshButton = document.querySelector("#refresh-button");
    const resetButton = document.querySelector("#reset-button")

    let response = await fetch("http://localhost:9001/counter");
    let result = await response.json();
    let countValue = result.value;

    function increment(){
        countValue++;
        countContainer.textContent = countValue;
        updateServer();
    }

    function decrement(){
        countValue--;
        countContainer.textContent = countValue;
        updateServer();
    }

    function refresh() {
        countValue = result.value;
        countContainer.textContent = result.value;
    }

    function reset() {
        countValue = result.defaultValue;
        countContainer.textContent = result.defaultValue;
    }

    async function updateServer() {       
        await fetch("http://localhost:9001/counter", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                value: countValue
            })
        })
    }

    setInterval(async function() {
        let updateResponse = await fetch("http://localhost:9001/counter");
        let updateResult = await updateResponse.json();
        countValue = updateResult.value;
        countContainer.textContent = updateResult.value;
    }, 1000)

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    refreshButton.addEventListener("click", refresh);
    resetButton.addEventListener("click", reset);
    countContainer.textContent = countValue;
}
main()