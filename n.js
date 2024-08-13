
function generateCard(bin, length) {
var bin2 = "";
var card1_l = [];
var card2_l = [];
var sum = 0;
var check_sum = 0;

// Replace 'x' with random digits and limit to length-1
for (var i = 0; i < bin.length && bin2.length < length - 1; i++) {
var char = bin[i].toLowerCase();
if (char === "x") {
char = Math.floor(Math.random() * 10);
}
bin2 += char;
}

// If bin2 is shorter than length-1, append random digits
while (bin2.length < length - 1) {
bin2 += Math.floor(Math.random() * 10);
}

// Convert bin2 to array of integers
for (var i = 0; i < bin2.length; i++) {
card1_l.push(parseInt(bin2[i]));
card2_l.push(parseInt(bin2[i]));
}

// Double the value of alternate digits starting from the rightmost
for (var i = card2_l.length - 1; i >= 0; i -= 2) {
card2_l[i] *= 2;
if (card2_l[i] > 9) {
card2_l[i] -= 9;
}
}

// Sum all the digits
for (var i in card2_l) {
sum += card2_l[i];
}

// Calculate the checksum
var mod = sum % 10;
if (mod !== 0) {
check_sum = 10 - mod;
}

// Add the checksum to the card number
card1_l.push(check_sum);

// Convert the card number array to a string
return card1_l.join('');
}

function generateMonth() {
var monthList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
return monthList[Math.floor(Math.random() * 12)];
}

function generateYear() {
var yearList = ["2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040"];
return yearList[Math.floor(Math.random() * yearList.length)];
}

function generateCCV(bin) {
var ccvLength = /^3[47]/.test(bin) ? 4 : 3; // Amex has 4-digit CVV
var ccv = "";
for (var i = 0; i < ccvLength; i++) {
ccv += Math.floor(Math.random() * 10);
}
return ccv;
}

function generate() {
var bin = document.getElementById("main_generator_bin").value.trim();
var ccv = document.getElementById("main_generator_cvv").value.trim();
var month = document.getElementById("main_generator_month").value;
var year = document.getElementById("main_generator_year").value;
var count = parseInt(document.getElementById("main_generator_quantity").value.trim());
var output = document.getElementById("main_generator_result");

if (bin === "") {
alert("BIN cannot be empty!");
return;
}
if (isNaN(count) || count <= 0) {
count = 10;
}

var cardLength = 16;
// Define length based on card type
if (/^3[47]/.test(bin)) { // Amex
cardLength = 15;
} else if (/^3[0689]/.test(bin)) { // Diners Club
cardLength = 14;
}

var cards = "";
for (var i = 0; i < count; i++) {
var generatedCard = generateCard(bin, cardLength);
var generatedMonth = month === "Random" ? generateMonth() : month;
var generatedYear = year === "Random" ? generateYear() : year;
var generatedCCV = ccv === "" || ccv === "Random" ? generateCCV(bin) : ccv;
cards += `${generatedCard}|${generatedMonth}|${generatedYear}|${generatedCCV}\n`;
}
output.value = cards.trim();
}

document.getElementById("main-generator").addEventListener("submit", function (e) {
e.preventDefault();
generate();
});