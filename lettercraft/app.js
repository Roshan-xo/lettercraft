// ===============================
// LETTERCRAFT APP.JS
// ===============================
// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
}
themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});
// Templates
const templates = {
    "Leave Letter": (name, receiver, reason, date, extra) => `
To,
${receiver}
Date: ${date}
Subject: Leave Request
Respected Sir/Madam,
I am ${name}. I kindly request leave due to ${reason}.
${extra}
Thank you for your consideration.
Yours faithfully,
${name}
`,
    "Permission Letter": (name, receiver, reason, date, extra) => `
To,
${receiver}
Date: ${date}
Subject: Permission Request
Respected Sir/Madam,
I would like to request permission regarding ${reason}.
${extra}
I kindly request your approval.
Sincerely,
${name}
`,
    "Sick Leave Letter": (name, receiver, reason, date, extra) => `
To,
${receiver}
Date: ${date}
Subject: Sick Leave Application
Respected Sir/Madam,
I am unable to attend due to illness.
Reason:
${reason}
${extra}
Kindly grant me leave.
Yours faithfully,
${name}
`,
    "Job Application": (name, receiver, reason, date, extra) => `
To,
${receiver}
Date: ${date}
Subject: Job Application
Dear Hiring Manager,
I am writing to apply for the position of ${reason}.
${extra}
Thank you for your time and consideration.
Sincerely,
${name}
`,
    "Complaint Letter": (name, receiver, reason, date, extra) => `
To,
${receiver}
Date: ${date}
Subject: Complaint Regarding ${reason}
Respected Sir/Madam,
I would like to bring the following issue to your attention.
${extra}
I hope the matter can be resolved soon.
Regards,
${name}
`,
    "Resignation Letter": (name, receiver, reason, date, extra) => `
To,
${receiver}
Date: ${date}
Subject: Resignation
Dear Sir/Madam,
I would like to formally resign from my position.
Reason:
${reason}
${extra}
Thank you for the opportunities provided.
Sincerely,
${name}
`
};
// Generate Letter
function generateLetter() {
    const type =
        document.getElementById("letterType").value;
    const name =
        document.getElementById("name").value.trim();
    const receiver =
        document.getElementById("receiver").value.trim();
    const reason =
        document.getElementById("reason").value.trim();
    const date =
        document.getElementById("date").value;
    const extra =
        document.getElementById("extraDetails").value.trim();
    if (!name || !receiver || !reason) {
        alert("Please fill all required fields.");
        return;
    }
    const letter =
        templates[type](name, receiver, reason, date, extra);
    document.getElementById("preview").innerText = letter;
    localStorage.setItem("lastLetter", letter);
}
// Load Previous Letter
window.addEventListener("load", () => {
    const saved =
        localStorage.getItem("lastLetter");
    if (saved) {
        document.getElementById("preview").innerText = saved;
    }
});
// Copy Letter
function copyLetter() {
    const text =
        document.getElementById("preview").innerText;
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Letter copied successfully.");
        })
        .catch(() => {
            alert("Unable to copy.");
        });
}
// PDF Download
function downloadPDF() {
    const content =
        document.getElementById("preview").innerText;
    if (
        content.includes("generated letter") ||
        content.trim() === ""
    ) {
        alert("Generate a letter first.");
        return;
    }
    if (typeof window.jspdf === "undefined") {
        alert(
            "Please include jsPDF CDN in index.html"
        );
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const lines =
        doc.splitTextToSize(content, 180);
    doc.text(lines, 10, 20);
    doc.save("LetterCraft.pdf");
}
// Search Templates
const searchInput =
    document.getElementById("searchTemplate");
searchInput?.addEventListener("input", function () {
    const value =
        this.value.toLowerCase();
    const select =
        document.getElementById("letterType");
    let found = false;
    for (let option of select.options) {
        if (
            option.text
                .toLowerCase()
                .includes(value)
        ) {
            select.value = option.text;
            found = true;
            break;
        }
    }
    if (!found && value.length > 0) {
        console.log("No template found");
    }
});
// Auto Live Preview
const fields = [
    "letterType",
    "name",
    "receiver",
    "reason",
    "date",
    "extraDetails"
];
fields.forEach(id => {
    const el =
        document.getElementById(id);
    el?.addEventListener("input", () => {
        const name =
            document.getElementById("name").value.trim();
        const receiver =
            document.getElementById("receiver").value.trim();
        const reason =
            document.getElementById("reason").value.trim();
        if (!name || !receiver || !reason)
            return;
        generateLetter();
    });
});
// Welcome
console.log(
    "LetterCraft Premium Loaded Successfully"
);