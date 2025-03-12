function calculateAverageScores(commits) {
    const scoreSums = {}; // To accumulate the total score for each attribute
    const scoreCounts = {}; // To count occurrences of each attribute

    function traverseReview(review, prefix = '') {
      Object.entries(review).forEach(([key, value]) => {
        const fullKey = key; // Create a flattened key
        if (typeof value === 'number') {
          // Initialize if not already present
          scoreSums[fullKey] = (scoreSums[fullKey] || 0) + value;
          scoreCounts[fullKey] = (scoreCounts[fullKey] || 0) + 1;
        } else if (
          typeof value === 'object' &&
          value !== null &&
          'score' in value
        ) {
          // Handle objects with a score field
          scoreSums[fullKey] = (scoreSums[fullKey] || 0) + value.score;
          scoreCounts[fullKey] = (scoreCounts[fullKey] || 0) + 1;
        } else if (typeof value === 'object' && value !== null) {
          // Recursively handle other nested objects
          traverseReview(value, fullKey);
        }
      });
    }

    commits.forEach((commit) => {
      if (commit.review) {
        traverseReview(commit.review);
      }
    });

    // Calculate averages
    const averages = {};
    Object.keys(scoreSums).forEach((key) => {
      averages[key] = Math.round(scoreSums[key] / scoreCounts[key]); // Round off to nearest integer
    });

    return averages;
  }

  export {calculateAverageScores}

  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split('/').map(Number); // Treat as MM/DD/YYYY
    return new Date(year, month - 1, day); 
  };
 
  export const formatDateForActivity = (isoDate) => {

    const newDate =  parseDate(isoDate)
    if (newDate) {
    const date = new Date(newDate);
    const now = new Date();
    const diffInTime = now - date; // Difference in milliseconds

    const diffInSeconds = Math.floor(diffInTime / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays <= 5) return `${diffInDays} days ago`;

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
    }
};

export const formatDateForMostActiveDay = (dateStr) => {
  const date = new Date(dateStr);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
  return formattedDate;
}


  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffInTime = now - date; // Difference in milliseconds
  
    const diffInSeconds = Math.floor(diffInTime / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInSeconds < 60) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
  
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays <= 5) return `${diffInDays} days ago`;
    if (diffInDays <= 7) return 'Last week';
    if (diffInDays <= 14) return '2 weeks ago';
    if (diffInDays <= 21) return '3 weeks ago';
    if (diffInDays <= 30) return 'Last month';
  
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  export {formatDate}

  function formatDateToIST(dateString) {
    const date = new Date(dateString);
  
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  export {formatDateToIST}


  export function generateDummyData () {
    const dummyData = [];
    const year = 2024;
  
    // Generate data for each day of 2024
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month
      for (let day = 1; day <= daysInMonth; day++) {
        // Create a timestamp for the current day
        const timestamp = new Date(year, month, day).getTime();
        
        // Generate a random number of contributions (you can adjust this logic)
        const count = Math.floor(Math.random() * 10);  // Random count between 0 and 9 for example
  
        dummyData.push({ timestamp, count });
      }
    }
  
    return dummyData;
  };
  
 export function formatDateAsShort(dateString) {
    const date = new Date(dateString); 
  
    const hours = date.getHours().toString().padStart(2, '0'); 
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear().toString().slice(-2); 
  
    // Format the date as "HH:MM DD/MM/YY"
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }

  export function formatCamelCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2') 
        .replace(/^./, (match) => match.toUpperCase()) 
        .toLowerCase() 
        .replace(/^\w/, (match) => match.toUpperCase()); 
  }
export function extractNoOfDays (dateRange) {

const diffInMilliseconds = dateRange.to - dateRange.from;

const millisecondsPerDay = 1000 * 60 * 60 * 24;
const numberOfDays = diffInMilliseconds / millisecondsPerDay;

return numberOfDays;
}


 export const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

export const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h = 0,
      s = 0,
      l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s, l };
};

// Function to convert HSL back to RGB
const hslToRgb = (h, s, l) => {
  let r = l, g = l, b = l;
  
  if (s !== 0) {
    const v = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const m = 2 * l - v;
    const h2 = h / 360;
    r = hueToRgb(m, v, h2 + 1 / 3);
    g = hueToRgb(m, v, h2);
    b = hueToRgb(m, v, h2 - 1 / 3);
  }
  
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

export const hueToRgb = (m, v, h) => {
  if (h < 0) h += 1;
  if (h > 1) h -= 1;
  if (h < 1 / 6) return m + (v - m) * 6 * h;
  if (h < 1 / 2) return v;
  if (h < 2 / 3) return m + (v - m) * (2 / 3 - h) * 6;
  return m;
};

export const generateShade = (baseHex, shadeFactor) => {
  const { r, g, b } = hexToRgb(baseHex); 
  const { h, s, l } = rgbToHsl(r, g, b);
  const newL = Math.min(Math.max(l + shadeFactor, 0), 1);
  const { r: newR, g: newG, b: newB } = hslToRgb(h, s, newL);
  return `rgb(${newR}, ${newG}, ${newB})`;
};


export const generateDynamicColors = (n) => {
  const colors = [];
  
  // Define base hues for blue, green, and red
  const hues = [220, 190,160 ]; // Blue, Green, Red
  
  // Generate two shades for each color
  hues.forEach((hue) => {
    // Lighter shade
    colors.push(`hsl(${hue}, 70%, 60%)`);
    // Darker shade
    colors.push(`hsl(${hue}, 70%, 40%)`);
  });

  return colors;
};


export function truncateWithEllipsis(str) {
  let formattedStr
  if (str) {
    if (str.length <= 8) {
      return str
    }
    else {
        formattedStr = str.slice(0, 12) + '...';
        return formattedStr;
    }
    
  }
  
}

export function deepFilter(obj) {
  function hasInvalidValue(val) {
    if (typeof val === 'object' && val !== null) {
      return Object.values(val).some(hasInvalidValue);
    }
    return val === 'N/A' || val === null;
  }

  return Object.entries(obj)
    .filter(([_, val]) => {
      if (typeof val === 'object' && val !== null) {
        return (
          !hasInvalidValue(val) && Object.keys(deepFilter(val)).length > 0
        );
      }

      return val !== 'N/A' && val !== null;
    })
    .reduce((acc, [key, val]) => {
      if (typeof val === 'object' && val !== null && val !== 'N/A') {
        acc[key] = deepFilter(val);
      } else {
        acc[key] = val;
      }
      return acc;
    }, {});
}

export const getLinesChanged = (item,orgOverview) => {
  return (
    <h1 className="flex flex-col  text-sm font-semibold text-green-700">
      +{orgOverview.data[item].additions}{' '}
      <span className="text-red-700">
        -{orgOverview.data[item].deletions}
      </span>
    </h1>
  );
};