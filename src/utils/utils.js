export function groupBy(tasks, key) {
    if (!Array.isArray(tasks)) {
      return {};
    }
    
    return tasks.reduce((result, task) => {
      const groupValue = task[key] || 'Uncategorized';
      if (!result[groupValue]) {
        result[groupValue] = [];
      }
      result[groupValue].push(task);
      return result;
    }, {});
  }
  