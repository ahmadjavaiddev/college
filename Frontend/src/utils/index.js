export class LocalStorage {
  // Get a value from local storage by key
  static get(key) {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  // Set a value in local storage by key
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove a value from local storage by key
  static remove(key) {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  static clear() {
    localStorage.clear();
  }
}

export function transformLecturesData(data) {
  const transformed = [];

  data.forEach((item) => {
    // Find if a day group already exists for the current section and day
    let dayGroup = transformed.find(
      (group) => group.section === item.section && group.day === item.day
    );

    // If no group found, create a new one and add it to the transformed array
    if (!dayGroup) {
      dayGroup = {
        _id: item._id,
        section: item.section,
        day: item.day,
        lectures: [],
      };
      transformed.push(dayGroup);
    }

    // Add the lecture details to the lectures array of the day group
    dayGroup.lectures.push({
      teacher: item.teacher,
      subject: item.subject,
      time: item.time,
      _id: item._id,
    });
  });

  return transformed;
}
