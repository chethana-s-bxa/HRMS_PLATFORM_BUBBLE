// Comprehensive data for multiple countries with states/provinces and cities
export const countriesData = {
  India: {
    states: {
      'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati', 'Kakinada', 'Rajahmundry', 'Eluru', 'Tenali', 'Ongole'],
      'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tezu', 'Roing'],
      'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Nagaon', 'Tinsukia', 'Bongaigaon', 'Dhubri'],
      'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Arrah', 'Munger', 'Saharsa', 'Siwan'],
      'Chhattisgarh': ['Raipur', 'Bhilai', 'Durg', 'Rajnandgaon', 'Bilaspur', 'Raigarh', 'Jagdalpur'],
      'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
      'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Junagadh', 'Anand', 'Bhavnagar', 'Jamnagar', 'Mehsana'],
      'Haryana': ['Faridabad', 'Gurgaon', 'Hisar', 'Rohtak', 'Panipat', 'Karnal', 'Yamunanagar'],
      'Himachal Pradesh': ['Shimla', 'Solan', 'Mandi', 'Kangra', 'Kullu', 'Palampur'],
      'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Giridih', 'Hazaribagh', 'Bokaro', 'Deoghar'],
      'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Belgaum', 'Hubli', 'Shimoga', 'Davangere', 'Tumkur', 'Kolar', 'Chikmagalur'],
      'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kottayam', 'Alappuzha', 'Malappuram', 'Kannur', 'Kasaragod'],
      'Madhya Pradesh': ['Indore', 'Bhopal', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Seoni', 'Satna'],
      'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Aurangabad', 'Solapur', 'Kolhapur', 'Nashik', 'Bareilly', 'Sangli', 'Akola'],
      'Manipur': ['Imphal', 'Thoubal', 'Churachandpur'],
      'Meghalaya': ['Shillong', 'Tura', 'Jaintia Hills'],
      'Mizoram': ['Aizawl', 'Lunglei', 'Saiha'],
      'Nagaland': ['Kohima', 'Dimapur', 'Mon'],
      'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur', 'Balangir', 'Balasore', 'Berhampur'],
      'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Sangrur'],
      'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Ajmer', 'Udaipur', 'Bikaner', 'Alwar', 'Barmer', 'Churu'],
      'Sikkim': ['Gangtok', 'Namchi', 'Gyalsing'],
      'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruppur', 'Vellore', 'Erode', 'Nagercoil', 'Kanyakumari'],
      'Telangana': ['Hyderabad', 'Secunderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
      'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar'],
      'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Varanasi', 'Meerut', 'Agra', 'Noida', 'Bareilly', 'Aligarh', 'Mathura'],
      'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Roorkee', 'Rudrapur'],
      'West Bengal': ['Kolkata', 'Asansol', 'Siliguri', 'Durgapur', 'Bardhaman', 'Kharagpur', 'Jalpaiguri', 'Darjeeling'],
    },
    postalCodePattern: '^[0-9]{6}$',
    postalCodeLength: 6,
  },
  USA: {
    states: {
      'Alabama': ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'],
      'Alaska': ['Anchorage', 'Juneau', 'Fairbanks', 'Ketchikan'],
      'Arizona': ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale'],
      'Arkansas': ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale'],
      'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'Oakland', 'Long Beach', 'Fresno', 'San Jose'],
      'Colorado': ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins'],
      'Connecticut': ['Bridgeport', 'New Haven', 'Stamford', 'Hartford'],
      'Delaware': ['Wilmington', 'Dover', 'Newark'],
      'Florida': ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg', 'Fort Lauderdale'],
      'Georgia': ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens'],
      'Hawaii': ['Honolulu', 'Pearl City', 'Kailua', 'Hilo'],
      'Idaho': ['Boise', 'Nampa', 'Pocatello', 'Idaho Falls'],
      'Illinois': ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Springfield'],
      'Indiana': ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend'],
      'Iowa': ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City'],
      'Kansas': ['Kansas City', 'Wichita', 'Olathe', 'Lawrence'],
      'Kentucky': ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro'],
      'Louisiana': ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette'],
      'Maine': ['Portland', 'Lewiston', 'Bangor', 'Augusta'],
      'Maryland': ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg'],
      'Massachusetts': ['Boston', 'Worcester', 'Springfield', 'Cambridge'],
      'Michigan': ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor'],
      'Minnesota': ['Minneapolis', 'Saint Paul', 'Rochester', 'Duluth'],
      'Mississippi': ['Jackson', 'Gulfport', 'Biloxi', 'Hattiesburg'],
      'Missouri': ['Kansas City', 'Saint Louis', 'Springfield', 'Columbia'],
      'Montana': ['Billings', 'Missoula', 'Great Falls', 'Bozeman'],
      'Nebraska': ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island'],
      'Nevada': ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas'],
      'New Hampshire': ['Manchester', 'Nashua', 'Concord', 'Dover'],
      'New Jersey': ['Newark', 'Jersey City', 'Paterson', 'Elizabeth'],
      'New Mexico': ['Albuquerque', 'Las Cruces', 'Santa Fe', 'Rio Rancho'],
      'New York': ['New York City', 'Buffalo', 'Rochester', 'Syracuse', 'Albany'],
      'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham'],
      'North Dakota': ['Bismarck', 'Fargo', 'Grand Forks', 'Minot'],
      'Ohio': ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo'],
      'Oklahoma': ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow'],
      'Oregon': ['Portland', 'Eugene', 'Salem', 'Gresham'],
      'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie'],
      'Rhode Island': ['Providence', 'Warwick', 'Cranston', 'Pawtucket'],
      'South Carolina': ['Charleston', 'Greenville', 'Columbia', 'Summerville'],
      'South Dakota': ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Watertown'],
      'Tennessee': ['Memphis', 'Nashville', 'Knoxville', 'Chattanooga'],
      'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'El Paso'],
      'Utah': ['Salt Lake City', 'Provo', 'West Valley', 'Ogden'],
      'Vermont': ['Burlington', 'Rutland', 'South Burlington', 'Montpelier'],
      'Virginia': ['Richmond', 'Virginia Beach', 'Arlington', 'Alexandria'],
      'Washington': ['Seattle', 'Spokane', 'Tacoma', 'Vancouver'],
      'West Virginia': ['Charleston', 'Huntington', 'Parkersburg', 'Wheeling'],
      'Wisconsin': ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha'],
      'Wyoming': ['Cheyenne', 'Casper', 'Laramie', 'Gillette'],
    },
    postalCodePattern: '^[0-9]{5}$',
    postalCodeLength: 5,
  },
  Canada: {
    states: {
      'Alberta': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
      'British Columbia': ['Vancouver', 'Victoria', 'Burnaby', 'Surrey'],
      'Manitoba': ['Winnipeg', 'Brandon', 'Thompson', 'Portage la Prairie'],
      'New Brunswick': ['Saint John', 'Fredericton', 'Moncton', 'Bathurst'],
      'Newfoundland and Labrador': ['St. Johns', 'Corner Brook', 'Gander', 'Grand Falls-Windsor'],
      'Northwest Territories': ['Yellowknife', 'Hay River', 'Inuvik'],
      'Nova Scotia': ['Halifax', 'Cape Breton', 'Glace Bay', 'New Glasgow'],
      'Nunavut': ['Iqaluit', 'Rankin Inlet', 'Arviat'],
      'Ontario': ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton'],
      'Prince Edward Island': ['Charlottetown', 'Summerside', 'Stratford'],
      'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau'],
      'Saskatchewan': ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw'],
      'Yukon': ['Whitehorse', 'Dawson', 'Haines Junction'],
    },
    postalCodePattern: '^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$',
    postalCodeLength: null,
  },
  UK: {
    states: {
      'England': ['London', 'Birmingham', 'Manchester', 'Leeds', 'Liverpool'],
      'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'],
      'Wales': ['Cardiff', 'Swansea', 'Newport', 'Wrexham'],
      'Northern Ireland': ['Belfast', 'Derry', 'Lisburn', 'Armagh'],
    },
    postalCodePattern: '^[A-Z]{1,2}\\d[A-Z\\d]? ?\\d[A-Z]{2}$',
    postalCodeLength: null,
  },
};

export const getAllCountries = () => Object.keys(countriesData).sort();

export const getStatesByCountry = (country) => {
  if (!country || !countriesData[country]) return [];
  return Object.keys(countriesData[country].states).sort();
};

export const getCitiesByCountryAndState = (country, state) => {
  if (!country || !state || !countriesData[country]) return [];
  return countriesData[country].states[state] || [];
};

export const filterCountries = (searchText) => {
  const text = (searchText || '').toLowerCase().trim();
  if (!text) return getAllCountries();
  return getAllCountries().filter(country =>
    country.toLowerCase().includes(text)
  );
};

export const filterStates = (country, searchText) => {
  if (!country) return [];
  const states = getStatesByCountry(country);
  const text = (searchText || '').toLowerCase().trim();
  if (!text) return states;
  return states.filter(state =>
    state.toLowerCase().includes(text)
  );
};

export const filterCities = (country, state, searchText) => {
  if (!state) return [];
  const cities = getCitiesByCountryAndState(country, state);
  const text = (searchText || '').toLowerCase().trim();
  if (!text) return cities;
  return cities.filter(city =>
    city.toLowerCase().includes(text)
  );
};

export const getPostalCodePattern = (country) => {
  if (!country || !countriesData[country]) return null;
  return countriesData[country].postalCodePattern;
};

export const getPostalCodeLength = (country) => {
  if (!country || !countriesData[country]) return null;
  return countriesData[country].postalCodeLength;
};

export const validatePostalCode = (country, postalCode) => {
  if (!country || !countriesData[country]) {
    return { isValid: false, error: 'Invalid country' };
  }

  const code = (postalCode || '').toString().trim();
  if (!code) {
    return { isValid: false, error: 'Postal code is required' };
  }

  const pattern = getPostalCodePattern(country);
  if (!pattern) {
    return { isValid: true, error: '' };
  }

  const regex = new RegExp(pattern);
  const isValid = regex.test(code);

  let error = '';
  if (!isValid) {
    switch (country) {
      case 'India':
        error = 'Indian pincode must be exactly 6 digits';
        break;
      case 'USA':
        error = 'US ZIP code must be 5 digits';
        break;
      case 'Canada':
        error = 'Invalid Canadian postal code format (e.g., K1A 0B1)';
        break;
      case 'UK':
        error = 'Invalid UK postcode format';
        break;
      default:
        error = 'Invalid postal code format';
    }
  }

  return { isValid, error };
};
