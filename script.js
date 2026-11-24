
let appliances = [
    { name: "Mobile Charger", power: 5, hours: 10 },
    { name: "Television", power: 8, hours: 6 },
    { name: "Computer", power: 15, hours: 5 },
    { name: "Printer", power: 10, hours: 4 }
];

const form = document.getElementById("applianceForm");
const list = document.getElementById("applianceList");
const rateInput = document.getElementById("rate");

function calculate() {
    list.innerHTML = "";

    let dailyTotal = 0;

    appliances.forEach((item, index) => {
        let waste = (item.power * item.hours) / 1000;
        dailyTotal += waste;

        let row = document.createElement("tr");

        [item.name, item.power, item.hours,
         waste.toFixed(3) + " kWh"].forEach(value => {
            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        let actionCell = document.createElement("td");
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            appliances.splice(index, 1);
            calculate();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        list.appendChild(row);
    });

    let monthlyTotal = dailyTotal * 30;
    let rate = Number(rateInput.value);

    document.getElementById("daily").textContent =
        dailyTotal.toFixed(2) + " kWh";

    document.getElementById("monthly").textContent =
        monthlyTotal.toFixed(2) + " kWh";

    document.getElementById("cost").textContent =
        "₹" + (monthlyTotal * rate).toFixed(2);

    showSuggestions();
}

function showSuggestions() {
    const suggestions = document.getElementById("suggestions");

    if (appliances.length === 0) {
        suggestions.textContent = "Add appliances to see suggestions.";
        return;
    }

    let sorted = [...appliances].sort((a, b) =>
        (b.power * b.hours) - (a.power * a.hours)
    );

    let highest = sorted[0];

    suggestions.innerHTML = "";

    let message = document.createElement("p");
    message.textContent =
        "⚠️ Highest wastage: " + highest.name +
        ". Consider switching it off when not in use.";

    suggestions.appendChild(message);

    let tip = document.createElement("p");
    tip.textContent =
        "💡 Unplug chargers and devices when they are not needed.";

    suggestions.appendChild(tip);

    let tip2 = document.createElement("p");
    tip2.textContent =
        "🌱 Reduce idle hours to save electricity and money.";

    suggestions.appendChild(tip2);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let power = Number(document.getElementById("power").value);
    let hours = Number(document.getElementById("hours").value);

    if (!name || !Number.isFinite(power) ||
        !Number.isFinite(hours) || power <= 0 ||
        hours < 0 || hours > 24) {
        alert("Enter valid appliance details.");
        return;
    }

    appliances.push({
        name: name,
        power: power,
        hours: hours
    });

    form.reset();
    calculate();
});

rateInput.addEventListener("input", calculate);

document.getElementById("reset").addEventListener("click", () => {
    appliances = [];
    calculate();
});

calculate();
