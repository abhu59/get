document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("solanaForm");
    const addressInput = document.getElementById("solanaAddress");
    const addressList = document.getElementById("addressList");

    // Load stored addresses
    const storedAddresses = JSON.parse(localStorage.getItem("solanaAddresses")) || [];
    storedAddresses.forEach(addAddressToDOM);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const address = addressInput.value.trim();
        if (!address) {
            alert("Please enter a Solana address.");
            return;
        }

        if (isValidSolanaAddress(address)) {
            addAddressToDOM(address);
            storedAddresses.push(address);
            localStorage.setItem("solanaAddresses", JSON.stringify(storedAddresses));
            addressInput.value = "";
        } else {
            alert("Invalid Solana address. Please enter a valid one.");
        }
    });

    function addAddressToDOM(address) {
        const div = document.createElement("div");
        div.classList.add("address-item");
        div.textContent = address;
        addressList.prepend(div);
    }

    function isValidSolanaAddress(address) {
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    }
});
