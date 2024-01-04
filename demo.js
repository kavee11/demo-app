//Open pop-up function
function openPopUp() {
  document.getElementById('modal').classList.toggle('active')
}

//insert data to the table
var clientArray = [
  { Organization: 'Bank of America', Code: 'SFAW', Handler: 'Savannah Nguyen' },
  { Organization: 'Google', Code: 'GSLK', Handler: 'Micheal Johnson' },
  { Organization: 'Apple Inc.', Code: 'APLQ', Handler: 'Emily Roberts' },
  { Organization: 'Microsoft', Code: 'MSFT', Handler: 'David Thompson' },
  { Organization: 'Amazon', Code: 'AMZN', Handler: 'Jessica Anderson' },
  { Organization: 'Facebook', Code: 'FBKL', Handler: 'Christopher Davis' },
  { Organization: 'Tesla', Code: 'TSLA', Handler: 'Olivia Wilson' },
  { Organization: 'Netflix', Code: 'NFLX', Handler: 'William Martinez' },
  { Organization: 'IBM', Code: 'IBMQ', Handler: 'Sophia Lee' },
  { Organization: 'Intel', Code: 'INTC', Handler: 'Daniel Hernandez' },
  { Organization: 'NVIDIA', Code: 'NVDA', Handler: 'Matthew Johnson' },
  { Organization: 'Adobe', Code: 'ADBE', Handler: 'John Lee' },
  { Organization: 'Twitter', Code: 'TWTR', Handler: 'Gabriel Ramirez' },
  {
    Organization: 'Tyota Motor Corporation',
    Code: 'TM',
    Handler: 'Carlos Hernandez',
  },
  { Organization: 'Alphabet Inc.', Code: 'GOOGL', Handler: 'Mohammed Khan' },
]

//check the event handler for the search
$('#searchClient').on('keyup', function () {
  var value = $(this).val().trim()

  var data = searchTable(value, clientArray)
  buildTable(data)

  // Reset pagination after clearing the search input
  if (value === '') {
    resetPagination()
  }
})

// Reset pagination
resetPagination()

//Search bar function
function searchTable(value, data) {
  var filteredData = []
  for (var x = 0; x < data.length; x++) {
    value = value.toLowerCase()
    var organization = data[x].organization.toLowerCase()

    if (organization.includes(value)) {
      filteredData.push(data[x])
    }
  }

  return filteredData
}

//Search bar close btn
document.querySelector('.closeBtn').addEventListener('click', function () {
  document.getElementById('searchClient').value = ''
  // Hide the close button after clearing the input
  this.style.display = 'none'
  resetPagination()
})

// Array to store the checkbox states
var checkboxStates = {}

//Function for manipulate the data (dynamically created objectives) into the table
function buildTable(data) {
  var table = document.getElementById('dataTable')
  table.innerHTML = ''

  for (var x = 0; x < data.length; x++) {
    var checkboxId = `checkbox_${data[x].Code}`
    var isChecked = checkboxStates[checkboxId] ? 'checked' : ''

    var row = `<tr>
                      <td><input type="checkbox" id="${checkboxId}" ${isChecked}></td>
                      <td>${data[x].Organization}</td>
                      <td>${data[x].Code}</td>
                      <td>${data[x].Handler}</td>
                  </tr>`
    table.innerHTML += row
  }

  // Add event listeners
  var checkboxes = table.querySelectorAll('input[type="checkbox"]')
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      checkboxStates[checkbox.id] = checkbox.checked
    })
  })
}

//padignation
var currentPage = 1
var rowsPerPage = 5
var totalPages = Math.ceil(clientArray.length / rowsPerPage)

// Function to display data for the current page
function displayCurrentPage() {
  var startIndex = (currentPage - 1) * rowsPerPage
  var endIndex = startIndex + rowsPerPage
  var dataToDisplay = clientArray.slice(startIndex, endIndex)
  buildTable(dataToDisplay)

  // Display data range
  var dataCount = clientArray.length
  var startData = startIndex + 1
  var endData = endIndex > dataCount ? dataCount : endIndex
  document.getElementById(
    'dataRange'
  ).innerText = `${startData}-${endData} of ${dataCount}`
}

// Function to next Page
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++
    displayCurrentPage()
  }
}

// Function for preveoius page
function prevPage() {
  if (currentPage > 1) {
    currentPage--
    displayCurrentPage()
  }
}

//reset the pagination
buildTable(clientArray)
function resetPagination() {
  currentPage = 1
  displayCurrentPage()
}

//display the first page
displayCurrentPage()

//Slider Functions
let slideIndex = 1
let nextButtonClicks = 0

// Function to display a specific slide
function showSlide(n) {
  const slides = document.getElementsByClassName('slide')
  const dots = document.getElementsByClassName('dot')

  if (n > slides.length) {
    slideIndex = 1
  } else if (n < 1) {
    slideIndex = slides.length
  }

  for (let x = 0; x < slides.length; x++) {
    slides[x].style.display = 'none'
  }

  for (let x = 0; x < dots.length; i++) {
    dots[x].classList.remove('active')

    if (x < slideIndex - 1) {
      dots[x].classList.add('deactive-dot')
    } else {
      dots[x].classList.remove('deactive-dot')
    }
  }

  slides[slideIndex - 1].style.display = 'block'
  dots[slideIndex - 1].classList.add('active-dot')
}

//show next slide
function nextSlide() {
  const nextButton = document.getElementById('nextBtn')

  if (nextButtonClicks < 2) {
    nextButtonClicks++
    plusSlides(1)
  } else {
    const confirmation = confirm('Are you sure you want to proceed')
    if (confirmation) {
      nextButtonClicks = 0
      plusSlides(1)
      nextButton.textContent = 'Next' // Reset button text to "Next"
      openView()
      location.reload()
    }
  }

  // Change button text to "Create job" after 2 clicks
  if (nextButtonClicks === 2) {
    nextButton.textContent = 'Create Job'
  }
}

// Function to switch to the next slide
function plusSlides(n) {
  showSlide((slideIndex += n))
}

// Function to set the current slide
function currentSlide(n) {
  showSlide((slideIndex = n))
}

// Show the first slide by default
showSlide(slideIndex)

//dropdown JS
$(document).ready(function () {
  $('#dropdown').on('change', function () {
    var selectedValue = $(this).val()
    if (selectedValue === 'template1') {
      $('#contentTemp').css('display', 'block')
    } else {
      $('#contentTemp').css('display', 'none')
    }
  })
})

//checkbox true
$(document).ready(function () {
  $('#dates').prop('checked', true)
  $('#status').prop('checked', true)
  $('#bill').prop('checked', true)
  $('#act ').prop('checked', true)
  $('#phase ').prop('checked', true)
  $('#stages ').prop('checked', true)
  $('#time  ').prop('checked', true)
  $('#material  ').prop('checked', true)
  $('#purchase   ').prop('checked', true)
  $('#cb  ').prop('checked', true)
  $('#jobNo   ').prop('checked', true)
})
