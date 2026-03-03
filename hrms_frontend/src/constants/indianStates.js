// Indian States and Major Cities
export const indianStatesData = {
  'Andhra Pradesh': [
    'Visakhapatnam',
    'Vijayawada',
    'Guntur',
    'Nellore',
    'Tirupati',
    'Kakinada',
    'Rajahmundry',
    'Eluru',
    'Tenali',
    'Ongole',
  ],
  'Arunachal Pradesh': [
    'Itanagar',
    'Naharlagun',
    'Pasighat',
    'Tezu',
    'Roing',
  ],
  'Assam': [
    'Guwahati',
    'Silchar',
    'Dibrugarh',
    'Nagaon',
    'Tinsukia',
    'Bongaigaon',
    'Dhubri',
  ],
  'Bihar': [
    'Patna',
    'Gaya',
    'Bhagalpur',
    'Muzaffarpur',
    'Darbhanga',
    'Arrah',
    'Munger',
    'Saharsa',
    'Siwan',
  ],
  'Chhattisgarh': [
    'Raipur',
    'Bhilai',
    'Durg',
    'Rajnandgaon',
    'Bilaspur',
    'Raigarh',
    'Jagdalpur',
  ],
  'Goa': [
    'Panaji',
    'Margao',
    'Vasco da Gama',
    'Mapusa',
    'Ponda',
  ],
  'Gujarat': [
    'Ahmedabad',
    'Surat',
    'Vadodara',
    'Rajkot',
    'Gandhinagar',
    'Junagadh',
    'Anand',
    'Bhavnagar',
    'Jamnagar',
    'Mehsana',
  ],
  'Haryana': [
    'Faridabad',
    'Gurgaon',
    'Hisar',
    'Rohtak',
    'Panipat',
    'Karnal',
    'Yamunanagar',
  ],
  'Himachal Pradesh': [
    'Shimla',
    'Solan',
    'Mandi',
    'Kangra',
    'Kullu',
    'Palampur',
  ],
  'Jharkhand': [
    'Ranchi',
    'Jamshedpur',
    'Dhanbad',
    'Giridih',
    'Hazaribagh',
    'Bokaro',
    'Deoghar',
  ],
  'Karnataka': [
    'Bangalore',
    'Mysore',
    'Mangalore',
    'Belgaum',
    'Hubli',
    'Shimoga',
    'Davangere',
    'Tumkur',
    'Kolar',
    'Chikmagalur',
  ],
  'Kerala': [
    'Kochi',
    'Thiruvananthapuram',
    'Kozhikode',
    'Thrissur',
    'Kottayam',
    'Alappuzha',
    'Malappuram',
    'Kannur',
    'Kasaragod',
  ],
  'Madhya Pradesh': [
    'Indore',
    'Bhopal',
    'Gwalior',
    'Jabalpur',
    'Ujjain',
    'Sagar',
    'Seoni',
    'Satna',
  ],
  'Maharashtra': [
    'Mumbai',
    'Pune',
    'Nagpur',
    'Aurangabad',
    'Solapur',
    'Kolhapur',
    'Nashik',
    'Bareilly',
    'Sangli',
    'Akola',
  ],
  'Manipur': [
    'Imphal',
    'Thoubal',
    'Churachandpur',
  ],
  'Meghalaya': [
    'Shillong',
    'Tura',
    'Jaintia Hills',
  ],
  'Mizoram': [
    'Aizawl',
    'Lunglei',
    'Saiha',
  ],
  'Nagaland': [
    'Kohima',
    'Dimapur',
    'Mon',
  ],
  'Odisha': [
    'Bhubaneswar',
    'Cuttack',
    'Rourkela',
    'Sambalpur',
    'Balangir',
    'Balasore',
    'Berhampur',
  ],
  'Punjab': [
    'Chandigarh',
    'Ludhiana',
    'Amritsar',
    'Jalandhar',
    'Patiala',
    'Bathinda',
    'Sangrur',
  ],
  'Rajasthan': [
    'Jaipur',
    'Jodhpur',
    'Kota',
    'Ajmer',
    'Udaipur',
    'Bikaner',
    'Alwar',
    'Barmer',
    'Churu',
  ],
  'Sikkim': [
    'Gangtok',
    'Namchi',
    'Gyalsing',
  ],
  'Tamil Nadu': [
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Salem',
    'Tiruppur',
    'Vellore',
    'Erode',
    'Nagercoil',
    'Kanyakumari',
  ],
  'Telangana': [
    'Hyderabad',
    'Secunderabad',
    'Warangal',
    'Nizamabad',
    'Karimnagar',
    'Khammam',
  ],
  'Tripura': [
    'Agartala',
    'Udaipur',
    'Dharmanagar',
  ],
  'Uttar Pradesh': [
    'Lucknow',
    'Kanpur',
    'Ghaziabad',
    'Varanasi',
    'Meerut',
    'Agra',
    'Noida',
    'Bareilly',
    'Aligarh',
    'Mathura',
  ],
  'Uttarakhand': [
    'Dehradun',
    'Haridwar',
    'Nainital',
    'Roorkee',
    'Rudrapur',
  ],
  'West Bengal': [
    'Kolkata',
    'Asansol',
    'Siliguri',
    'Durgapur',
    'Bardhaman',
    'Kharagpur',
    'Jalpaiguri',
    'Darjeeling',
  ],
};

// Get all states
export const getAllStates = () => Object.keys(indianStatesData).sort();

// Get cities by state
export const getCitiesByState = (state) => {
  return indianStatesData[state] || [];
};

// Filter states by search text (case-insensitive)
export const filterStates = (searchText) => {
  const text = (searchText || '').toLowerCase().trim();
  if (!text) return getAllStates();
  
  return getAllStates().filter(state =>
    state.toLowerCase().includes(text)
  );
};

// Filter cities by state and search text (case-insensitive)
export const filterCities = (state, searchText) => {
  if (!state) return [];
  
  const cities = getCitiesByState(state);
  const text = (searchText || '').toLowerCase().trim();
  
  if (!text) return cities;
  
  return cities.filter(city =>
    city.toLowerCase().includes(text)
  );
};
