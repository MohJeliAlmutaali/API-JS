const { response } = require("express");
const mahasiswaNim = 1102020; // Replace with the actual nim
const updatedData = {
  nama: 'Ronaldo',
  gender: 'L',
  prodi: 'TE',
  alamat: 'Jl. Cibolang Kidul'
};

fetch(`http://localhost:4000/mahasiswa/${mahasiswaNim}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updatedData)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

const addData = {
  nim: '1102022',
  nama: 'Jeli',
  gender: 'L',
  prodi: 'TI',
  alamat: 'Jl. Ciogong'
}

fetch(`http://localhost:4000/mahasiswa/`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(addData)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error', error));

const mahasiswaNIM = '1102022'; 
fetch(`http://localhost:4000/mahasiswa/${mahasiswaNIM}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .then(data => console.log('Response Data:', data))
    .catch(error => {
        console.error('Error:', error)
    });
 
