-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 04 Feb 2020 pada 16.14
-- Versi Server: 10.1.10-MariaDB
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fregata`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `account_admin`
--

CREATE TABLE `account_admin` (
  `id_admin` varchar(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `level` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `account_admin`
--

INSERT INTO `account_admin` (`id_admin`, `username`, `password`, `nama`, `alamat`, `level`) VALUES
('A001', 'admin', 'admin1', 'Gunawan', 'Petamburan', 'Administrator');

-- --------------------------------------------------------

--
-- Struktur dari tabel `account_user`
--

CREATE TABLE `account_user` (
  `email` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `no_telp` varchar(20) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `kota` varchar(30) NOT NULL,
  `provinsi` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `account_user`
--

INSERT INTO `account_user` (`email`, `username`, `password`, `no_telp`, `alamat`, `kota`, `provinsi`) VALUES
('mc.gunawan04@gmail.com', 'de buff', 'admin1', '12345', 'asd', 'jakarta', 'dki jakarta'),
('water.invasioner@gmail.com', 'de.Guts', '02031995', '089652575412', 'petamburan', 'jakarta pusar', 'dki jakarta');

-- --------------------------------------------------------

--
-- Struktur dari tabel `brand`
--

CREATE TABLE `brand` (
  `kode_brand` varchar(10) NOT NULL,
  `nama_brand` varchar(50) NOT NULL,
  `gambar` varchar(100) NOT NULL,
  `deskripsi` varchar(1000) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `brand`
--

INSERT INTO `brand` (`kode_brand`, `nama_brand`, `gambar`, `deskripsi`, `status`) VALUES
('HMEN', 'Hammer', 'One Punch Man 04 1080p.mkv_snapshot_19.21.419.jpg', 'ssasda', 'Active'),
('MAUS', 'Maverick Auto', 'One Punch Man 06 1080p.mkv_snapshot_00.49.334.jpg', 'asdasdad', 'Active'),
('PDID', 'Pindad Indonesia', 'PM3.png', 'xxxx', 'Active'),
('PDSG', 'Pindad Singapore', 'PDSG.jpg', 'Boongan aje ini mah', 'Active');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart`
--

CREATE TABLE `cart` (
  `email` varchar(100) NOT NULL,
  `kode_produk` varchar(10) NOT NULL,
  `qty` int(10) NOT NULL,
  `harga` int(11) NOT NULL,
  `no_faktur` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `cart`
--

INSERT INTO `cart` (`email`, `kode_produk`, `qty`, `harga`, `no_faktur`, `status`) VALUES
('water.invasioner@gmail.com', 'HGPD002', 4, 7000000, 'FK00004', 'checkout'),
('water.invasioner@gmail.com', 'HGPD005', 1, 2750000, 'FK00004', 'checkout'),
('water.invasioner@gmail.com', 'RFPD003', 1, 9000000, 'FK00004', 'checkout'),
('water.invasioner@gmail.com', 'RFPD002', 1, 8500000, 'FK00004', 'checkout'),
('water.invasioner@gmail.com', 'HGPD004', 1, 2500000, 'FK00004', 'checkout'),
('water.invasioner@gmail.com', 'HGPD002', 1, 7000000, 'FK00005', 'checkout'),
('water.invasioner@gmail.com', 'HGPD002', 3, 7000000, 'FK00006', 'checkout'),
('water.invasioner@gmail.com', 'HGPD004', 1, 2500000, 'FK00006', 'checkout');

-- --------------------------------------------------------

--
-- Struktur dari tabel `faktur`
--

CREATE TABLE `faktur` (
  `no_faktur` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nama_penerima` int(50) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `kota` varchar(30) NOT NULL,
  `provinsi` varchar(20) NOT NULL,
  `total_barang` int(11) NOT NULL,
  `biaya_kirim` int(11) NOT NULL,
  `total_faktur` int(11) NOT NULL,
  `datecreated` date NOT NULL,
  `dateconfirmed` date NOT NULL,
  `dateshipped` date NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `faktur`
--

INSERT INTO `faktur` (`no_faktur`, `email`, `nama_penerima`, `alamat`, `kota`, `provinsi`, `total_barang`, `biaya_kirim`, `total_faktur`, `datecreated`, `dateconfirmed`, `dateshipped`, `status`) VALUES
('FK00001', '', 0, '', '', '', 0, 0, 0, '0000-00-00', '0000-00-00', '0000-00-00', ''),
('FK00002', 'water.invasioner@gmail.com', 0, 'petamburan', 'jakarta pusar', 'dki jakarta', 50750000, 250000, 51000000, '2020-02-03', '0000-00-00', '0000-00-00', 'created'),
('FK00003', 'water.invasioner@gmail.com', 0, 'petamburan', 'jakarta pusar', 'dki jakarta', 50750000, 250000, 51000000, '2020-02-03', '0000-00-00', '0000-00-00', 'created'),
('FK00004', 'water.invasioner@gmail.com', 0, 'petamburan', 'jakarta pusar', 'dki jakarta', 50750000, 250000, 51000000, '2020-02-03', '0000-00-00', '0000-00-00', 'created'),
('FK00005', 'water.invasioner@gmail.com', 0, 'petamburan', 'jakarta pusar', 'dki jakarta', 7000000, 250000, 7250000, '2020-02-04', '0000-00-00', '0000-00-00', 'created'),
('FK00006', 'water.invasioner@gmail.com', 0, 'petamburan', 'jakarta pusar', 'dki jakarta', 23500000, 250000, 23750000, '2020-02-04', '0000-00-00', '0000-00-00', 'created');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembayaran`
--

CREATE TABLE `pembayaran` (
  `no_payment` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `no_faktur` varchar(10) NOT NULL,
  `bank` varchar(20) NOT NULL,
  `nominal` int(11) NOT NULL,
  `gambar` varchar(50) NOT NULL,
  `tanggal` date NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pembayaran`
--

INSERT INTO `pembayaran` (`no_payment`, `email`, `no_faktur`, `bank`, `nominal`, `gambar`, `tanggal`, `status`) VALUES
('P00001', '', 'xxxx', 'BCA', 10000, 'P00001.jpg', '0000-00-00', 'confirming');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `kode_produk` varchar(10) NOT NULL,
  `nama_produk` varchar(50) NOT NULL,
  `kategori` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `deskripsi` varchar(1000) NOT NULL,
  `spesifikasi` varchar(1000) NOT NULL,
  `harga_beli` int(11) NOT NULL,
  `harga_jual` int(11) NOT NULL,
  `gambar1` varchar(30) NOT NULL,
  `gambar2` varchar(30) NOT NULL,
  `gambar3` varchar(30) NOT NULL,
  `kode_brand` varchar(10) NOT NULL,
  `exclusive` varchar(4) NOT NULL,
  `datecreate` date NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`kode_produk`, `nama_produk`, `kategori`, `quantity`, `deskripsi`, `spesifikasi`, `harga_beli`, `harga_jual`, `gambar1`, `gambar2`, `gambar3`, `kode_brand`, `exclusive`, `datecreate`, `status`) VALUES
('HGPD001', 'Glock-7', 'HG', 1, 'ya gitu', 'hemmmmm', 1, 100, 'HGPD001.jpg', '', '', 'PDID', 'Yes', '2020-01-01', 'Active'),
('HGPD002', 'MG-4', 'HG', 20, 'Pistol keluaran terbaru ini memiliki laras sepanjang 4 inci – lebih pendek dari sang pendahulu yang terkenal, pistol G2 – untuk mencapai jarak tembak efektif dalam penggunaan area jarak dekat. MAG 4 lebih mudah dioperasikan berkat bahan material yang lebih ringan dan mekanisme kokang yang lebih sederhana.', 'Caliber : 9x19 mm Parabellum  \r\nBarrel length : 4 inch  \r\nLength : 180 mm  \r\nWeight : 0.9 kg  \r\nSafety : Hammer Lock  \r\nOperation : - single action - semi automatic  \r\nEffective range : 15m  \r\nRifling : 6 grooves, RH 250 mm/twist', 2500000, 7000000, 'Mag4.jpg', 'Mag4.jpg', 'Mag4.jpg', 'PDID', 'No', '2020-01-07', 'Active'),
('HGPD003', 'P-3A Kal. 7.65 mm', 'HG', 20, 'Varian terkecil dari line-up pistol kami dengan kaliber 7,65 x 17 mm. Di desain untuk pertempuran serta penembakan jarak dekat dengan jarak efektif 15 meter yang dihasilkan dari panjang laras 102mm dan kapasitas magasen 12 peluru. Pistol ini dapat disembunyikan di tubuh penggunanya tanpa membatasi ruang gerak dari penggunanya tersebut.', 'Cartridge : 7.65 x 17 mm\r\n\r\nBarrel Length : 102 mm\r\n\r\nCapacity : 12 cartridge\r\n\r\nWeight : 794 gr\r\n\r\nSight : - Front : Square integral with slide - Rear : Square notch dovetailed to slide\r\n\r\nType of Fire : Double action\r\n\r\nAmmunition : MU15-TJ 7.65 mm ( .32 ACP )\r\n\r\nEffective range : 25 m', 1700000, 2000000, 'HGPD003.jpg', '', '', 'PDID', 'Yes', '2020-01-29', 'Active'),
('HGPD004', 'G2 COMBAT Kal. 9 mm', 'HG', 10, 'G2 COMBAT Kal. 9 mm\r\nPistol G2 Combat menggunakan amunisi 9 x 19 mm parabellum. Digunakan secara luas oleh angkatan bersenjata Indonesia, pistol ini dapat diandalkan dalam berbagai situasi. Panjang laras 4.5 inch memastikan akurasi yang baik sambil menjaga kemampuan untuk menghadapi situasi pertempuran dengan jarak yang sangat dekat.', 'Capacity : 15 rounds\r\n\r\nBarrel length : 4,5 inch\r\n\r\nWeight : 0.90 Kg\r\n\r\nOverall length : 200 mm\r\n\r\nHigh : 136 mm\r\n\r\nSight : fixed\r\n\r\nEvective Range : 25 m', 2000000, 2500000, 'HGPD004.jpg', '', '', 'PDID', '', '0000-00-00', 'Active'),
('HGPD005', 'G2 ELITE Kal. 9 mm', 'HG', 4, 'Pistol G2 Elite merupakan salah satu pistol produksi PT. Pindad dengan kaliber 9 x 19 mm parabellum. Pistol ini memiliki magazine yang mampu untuk menampung 15 butir peluru. Pistol ini memiliki keunggulan berupa pisir belakang yang bersifat adjustable. Dengan panjang laras 5 inchi, akurasi yang dihasilkan tidak dapat diragukan.', 'Capacity : 15 rounds\r\n\r\nBarrel : - Length : 5 inch - Rifling : 6 grooves, 1:10 inches right hand twist\r\n\r\nWeight : 1+0.05 kg\r\n\r\nOverall length : 221 mm\r\n\r\nHeight : 139 mm\r\n\r\nSight : - Front : Fixed type - Rear : Adjustable / Fixed rear sight\r\n\r\nEvective Range : 25 m\r\n\r\nCalibre : 9x19 mm\r\n\r\nLength : 223 mm\r\n\r\nOperation / action : Single action, semi auto\r\n\r\nCapacity magazine : 15 rounds', 2000000, 2750000, 'HGPD005.jpg', '', '', 'PDID', '', '0000-00-00', 'Active'),
('RFPD001', 'PM3', 'HG', 5, 'Di desain secara khusus untuk mendukung performa prajurit dalam pertempuran jarak dekat seperti pada perang kota. PM3 menggunakan munisi kaliber 9 x 19 mm parabellum yang dapat mengenai target secara akurat hingga jarak 75 meter. Senjata ini menggunakan mekanisme gas operated, meninggalkan mekanisme blowback yang disematkan pada varian PM2. Terdapat rail pada bagian atas receiver serta bagian kiri, kanan, dan bawah dari handguard yang dapat digunakan untuk memasang berbagai jenis attachment.', 'Stock extended : 720 mm\r\nStock folded : 494 mm\r\nBarrel length : 210 mm\r\nRate of fire : 750-850 rpm\r\nType of fire : safe, single shot and full automatic\r\nEffective range : 75 m', 7000000, 10000000, 'PM3.png', 'PM3.png', 'PM3.png', 'HMEN', 'Yes', '2020-01-28', 'Active'),
('RFPD002', 'SS3', 'AR', 20, 'Varian terbaru dari keluarga senapan serbu PT Pindad. Hadir dengan kaliber 7.62 x 51 mm yang lebih besar daripada pendahulunya, SS3 di desain untuk menjadi Main Battle Rifle dalam pertempuran yang dapat diandalkan pada berbagai skenario pertempuran. Dengan panjang laras 500 mm, SS3 memiliki jarak tembak efektif 400 meter menggunakan pisir serta 800 meter dengan menggunakan optik. Mekanisme gas operated tetap dipertahankan pada varian ini, yang dikombinasikan dengan magasen dengan kapasitas 20 peluru.', 'Stock extended : 1080-1150 m\r\n\r\nStock folded : 836 mm\r\n\r\nBarrel length : 500 mm\r\n\r\nRate of fire : 720-760 mm\r\n\r\nEffective range : - 400 m (mechanical) - 800 m (optical)\r\n\r\nOperation : Gas operated\r\n\r\nMagazine capacity : 20 rounds', 7500000, 8500000, 'RFPD002.png', '', '', 'PDID', '', '0000-00-00', 'Active'),
('RFPD003', 'SS2-V5 Kal. 5.56 mm', 'AR', 30, 'Varian SS2 dengan laras yang diperpendek. SS2-V5 menggunakan laras dengan panjang 255 mm yang dapat menembak dengan efektif sampai dengan jarak 200 meter. Dengan berat kosong 3.35 kg dan berat isi 3.71 kg, SS2-V5 memiliki tingkat mobilitas yang sangat tinggi serta cocok untuk digunakan dalam berbagai skenario pertempuran jarak dekat.', 'Calibre : 5.56 x 45 mm\r\n\r\nLength : Butt extended : 755 mm Butt folded : 528 mm\r\n\r\nBarrel : Length : 255 mm Rifling : 6 Grooves, RH 177.8 mm(7") twist\r\n\r\nWeight : With empty magazine : 3,35 kg With full magazine (30 rounds) : 3.71 kg\r\n\r\nSight : Mechanical sight\r\n\r\nRate of Fire : Cyclic : 720 - 760 rpm Effective automatic fire : 120 - 200 rpm Effective single shot : 60 rpm\r\n\r\nAmmunition : - Ordinary ball cartridge MU5-Tj or SS 109 - Blank cartridge MU5-H - Cartridge for grenade launching\r\n\r\nEffective Range : 200 m', 7500000, 9000000, 'RFPD003.jpg', '', '', 'PDID', '', '0000-00-00', 'Active'),
('RFPD004', 'SS2-V4 HB Kal. 5.56 mm', 'AR', 5, 'Varian SS2 dengan laras yang diperkokoh, Heavy Barrel. Heavy barrel yang disematkan pada SS2-V4 ini membawa peningkatan pada performa, dengan membuat senjata ini lebih akurat saat menembak. Selain itu, dengan fitur heavy barrel, senjata memiliki daya tahan yang lebih terhadap panas akibat tembakan yang terus-menerus.', 'Calibre : 5.56 x 45 mm\r\n\r\nLength : Butt extended : 1025 mm Butt folded : 782 mm\r\n\r\nBarrel : Length : 500 mm Rifling : 6 grooves, RH 177.8 mm twist\r\n\r\nWeight : With empty magazine : 4, 95 kg With full magazine (30 rounds) : 5. 36 kg\r\n\r\nSight : Optical sight (Trijicon)\r\n\r\nRate of Fire : Cyclic : 720 - 760 rpm Effective automatic fire : 120 - 200 rpm Effective single shot : 60 rpm\r\n\r\nAmmunition : - Ordinary ball cartridge MU5-Tj or SS 109 - Blank cartridge MU5-H\r\n\r\nEffective Range : 500 m', 9000000, 10500000, 'RFPD004.jpg', '', '', 'PDID', '', '0000-00-00', 'Active'),
('RFPD005', 'SS1-M1 Kal. 5.56 mm', 'AR', 20, 'Mengambil rancangan dasar dari SS1-V1, SS1-M1 dibuat secara khusus untuk memenuhi kebutuhan satuan Marinir di kalangan TNI-AL. Untuk itu, pengembangan dilakukan dengan memberikan coating khusus yang membuat sebuah senjata SS1-M1 tahan terhadap karat sehingga dapat dioperasikan secara penuh di wilayah laut dan perairan. Istilah M sendiri berangkat dari kata Marinized.', 'Length : Butt extended : 997 mm Butt folded : 753 mm\r\n\r\nBarrel : Length : 449 mm Rifling : 6 grooves, RH 177.8 mm(7") twist\r\n\r\nWeight : With empty magazine : 4.06 kg With full magazine (30 rounds) : 4.42 kg\r\n\r\nSight : Rear sight :"O" type and 2 positions : Mark 250 for range (0-300) m Mark 400 for range (300-450) m Foresight : Protected post Telescope sight (optional) : Yes\r\n\r\nRate of Fire : Cyclic : 720 - 760 rpm Effective automatic fire : 120 - 200 rpm Effective single shot : 60 rpm\r\n\r\nAmmunition : - Ordinary ball cartridge MU5-Tj or SS 109 - Blank cartridge MU5-H - Cartridge for grenade launching\r\n\r\nEffective Range : 400 m', 11000000, 8000000, 'RFPD005.jpg', '', '', 'PDID', '', '0000-00-00', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_admin`
--
ALTER TABLE `account_admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `account_user`
--
ALTER TABLE `account_user`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`kode_brand`);

--
-- Indexes for table `faktur`
--
ALTER TABLE `faktur`
  ADD PRIMARY KEY (`no_faktur`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`no_payment`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`kode_produk`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
