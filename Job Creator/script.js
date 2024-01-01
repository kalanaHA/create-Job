// Get elements from the DOM
const openModalButton = document.getElementById('open_modal');
const cardContainerWindow = document.getElementById('cardContainerWindow');
const cardContainer = document.getElementById('cardContainer');
const createButton = document.getElementById('createButton');
const nextButton = document.getElementById('nextButton');
const searchBar = document.getElementById('searchBar');

let currentCardIndex = 1;
const totalCards = 3;

// Function to show the current card and handle the Next button
function showNextCard() {
  const currentCard = document.getElementById(`card${currentCardIndex}`);
  currentCard.style.display = 'block';

  // Hide or show the Next button 
  if (currentCardIndex === totalCards) {
    nextButton.style.display = 'none';
  } else {
    nextButton.style.display = 'block';
  }

  const currentPageRadio = document.getElementById(`page${currentCardIndex}`);
  if (currentPageRadio) {
    currentPageRadio.checked = true;
  }

}

//dump data for table view
const data = [
  { organization: 'Facebook', code: 'FBKL', handler: 'Cristoper Dalvis' },
  { organization: 'Youtube', code: 'YT', handler: 'Olivia Wilson' },
  { organization: 'Intel', code: 'INTC', handler: 'Denial Harward' },
  { organization: 'Google', code: 'GOO', handler: 'Emily Johnson' },
  { organization: 'Amazon', code: 'AMZ', handler: 'William Smith' },
  { organization: 'Microsoft', code: 'MSFT', handler: 'Sophia Brown' },
  { organization: 'Apple', code: 'APPL', handler: 'Daniel Martinez' },
  { organization: 'Samsung', code: 'SSNLF', handler: 'Ava Anderson' },
  { organization: 'Netflix', code: 'NFLX', handler: 'Liam Garcia' },
  { organization: 'Tesla', code: 'TSLA', handler: 'Ella Thompson' },
  { organization: 'Twitter', code: 'TWTR', handler: 'Noah Rodriguez' },
  { organization: 'LinkedIn', code: 'LNKD', handler: 'Mia Walker' },
  
];

const itemsPerPage = 5; // Number of items to display per page
let currentPage = 1; // Current page being displayed

// Function to create table rows based on the data
function populateTable(data, currentPage) {
  const tableBody = document.querySelector('#clientTable tbody');
  const dataCountElement = document.getElementById('dataCount');

  // Clear existing table content
  tableBody.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

    // Loop through the sliced data and create rows
    currentPageData.forEach(item => {
    const row = document.createElement('tr');

    // Create cells for each property in the data
    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    const organizationCell = document.createElement('td');
    organizationCell.textContent = item.organization;
    row.appendChild(organizationCell);

    const codeCell = document.createElement('td');
    codeCell.textContent = item.code;
    row.appendChild(codeCell);

    const handlerCell = document.createElement('td');
    handlerCell.textContent = item.handler;
    row.appendChild(handlerCell);

    // Append the row to the table body
    tableBody.appendChild(row);
    });

    //pagination info get part
   const totalEntries = data.length;
   const startEntry = Math.min(startIndex + 1, totalEntries);
   const endEntry = Math.min(startIndex + currentPageData.length, totalEntries);

   dataCountElement.textContent = `${startEntry}-${endEntry} of ${totalEntries}`;

   const totalPages = Math.ceil(data.length / itemsPerPage);

  const pageNavigation = document.querySelector('.page-navigation');
  pageNavigation.innerHTML = ''; // Clear previous buttons

  // Generate radio buttons for each page
  for (let i = 1; i <= totalPages; i++) {
    const radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.id = `page${i}`;
    radioButton.name = 'pages';
    radioButton.value = i;
    radioButton.classList.add('page-radio');

    // Set the first page as checked by default
    if (i === currentPage) {
      radioButton.checked = true;
    }

    const label = document.createElement('label');
    label.htmlFor = `page${i}`;
    label.textContent = i;

    // Append radio button and label to the page navigation container
    pageNavigation.appendChild(radioButton);
    
  }

}

// Event listener for the Open Modal button
openModalButton.addEventListener('click', () => {
  openModalButton.style.display = 'none';
  cardContainerWindow.style.display = 'block';
  showNextCard();
  populateTable(data, currentPage);
});

// Event listener for the searchBar
searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredData = data.filter(item =>
    item.organization.toLowerCase().includes(searchTerm)
  );
  currentPage = 1; // Reset currentPage when a search is initiated
  populateTable(filteredData, currentPage);
});

// Event listener for the Next button
nextButton.addEventListener('click', () => {
  // Hide the current card
  const currentCard = document.getElementById(`card${currentCardIndex}`);
  currentCard.style.display = 'none';
  console.log('Card', currentCardIndex);

  //add condition for display fields 
  if (currentCardIndex === 1) {
    templateFields.style.display = 'none';
  }

  //add condition for display create button
  if (currentCardIndex === 2) {
    createButton.style.display = 'block';
  }

  // Show the next card
  if (currentCardIndex < totalCards) {
    currentCardIndex++;
    showNextCard();
  }

  //add radio button for pagination
  const currentPageRadio = document.getElementById(`page${currentCardIndex}`);
  if (currentPageRadio) {
    currentPageRadio.checked = true;
  }

});

// Function to show previous page
function showPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    populateTable(data, currentPage);
  }
}

// Function to show next page
function showNextPage() {
  const maxPage = Math.ceil(data.length / itemsPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    populateTable(data, currentPage);
  }
}

// Add event listeners for pagination controls
const previousPageButton = document.getElementById('previousPageButton');
const nextPageButton = document.getElementById('nextPageButton');

previousPageButton.addEventListener('click', showPreviousPage);
nextPageButton.addEventListener('click', showNextPage);


// Get the template select element and the templateFields div
const templateSelect = document.getElementById('templateSelect');
const templateFields = document.getElementById('templateFields');

// Function to handle template selection
function handleTemplateSelection() {
  const selectedTemplate = templateSelect.value;

  // Show/hide additional fields based on template selection
  if (selectedTemplate !== 'none') {
    templateFields.style.display = 'block';
  } else {
    templateFields.style.display = 'none';
  }
}

// Event listener for template selection change
templateSelect.addEventListener('change', handleTemplateSelection);