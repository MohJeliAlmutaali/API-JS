const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET mahasiswa
router.get('/', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (error, results) => {
    if (error) {
      console.error('Error fetching mahasiswa:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// GET /mahasiswa/:nim
router.get('/:nim', (req, res) => {
  const mahasiswaNim = req.params.nim;
  db.query('SELECT * FROM mahasiswa WHERE nim = ?', [mahasiswaNim], (error, results) => {
    if (error) {
      console.error('Error fetching mahasiswa:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Mahasiswa not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// PUT /mahasiswa/:nim
router.put('/:nim', (req, res) => {
  const mahasiswaNim = req.params.nim;
  const { nama, gender, prodi, alamat } = req.body;
  db.query(
    'UPDATE mahasiswa SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nim = ?',
    [nama, gender, prodi, alamat, mahasiswaNim],
    (error) => {
      if (error) {
        console.error('Error updating mahasiswa:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.json("Updating mahasiswa successfully");
      }
    }
  );
});

router.post('/', (req, res) => {
    const newMahasiswa = req.body;

    // Pastikan req.body berisi data yang sesuai
    if (!newMahasiswa || typeof newMahasiswa !== 'object') {
        res.status(400).json({ message: 'Invalid request body' });
        return;
    }

    db.query("INSERT INTO mahasiswa SET ?", newMahasiswa, (error, results) => {
        if (error) {
            console.error(`Error creating mahasiswa: ${error}`);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.status(200).json({ message: 'Mahasiswa created successfully'});
        }
    });
});

router.delete('/:nim', (req, res) => {
    const mahasiswa = req.body;
    const nama = mahasiswa.nama
    const mahasiswaDeleteNIM = req.params.nim;
    db.query('DELETE FROM mahasiswa WHERE nim = ?', [mahasiswaDeleteNIM], (error, results) => {
        if (error) {
            console.error("Error deleting mahasiswa", error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Mahasiswa not found' });
        } else {
            res.status(200).json({ message: `Mahasiswa ${nama}deleted successfully` });
        }
    });
});

module.exports = router;
