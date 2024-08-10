export const extractRootDirPath = (path: string) => {
  const pathArray = path.split("\\");
  const pathOfRootDir = pathArray.slice(0, pathArray.indexOf("src"));
  return pathOfRootDir.join("\\");
};

export const convertToSeconds = (timeString: string) => {
  const timeValue = parseInt(timeString.replace(/\D/g, ""));
  const timeUnit = timeString.replace(/\d/g, "").toLowerCase();

  switch (timeUnit) {
    case "s": // seconds
      return timeValue;
    case "m": // minutes
      return timeValue * 60;
    case "h": // hours
      return timeValue * 3600;
    case "d": // days
      return timeValue * 86400;
    case "w": // weeks
      return timeValue * 604800;
    case "y": // years
      return timeValue * 31536000;
    default:
      throw new Error("Invalid time unit");
  }
};

export const generateMatchQueryForListingAggregation = (filterQuery: {
  [key: string]: string | string[];
}) => {
  const matchStage: any = {};

  for (const [key, value] of Object.entries(filterQuery)) {
    if (typeof value === "string") {
      if (value.startsWith("not_")) {
        matchStage[key] = { $ne: value.substring(4) };
      } else {
        matchStage[key] = value;
      }
    } else if (Array.isArray(value)) {
      let temp: any = {};
      value.forEach((x) => {
        if (x.includes("from:")) {
          temp[key] = {
            ...temp[key],
            $gte: parseFloat(x.substring(x.indexOf(":") + 1)),
          };
        } else if (x.includes("to:")) {
          temp[key] = {
            ...temp[key],
            $lte: parseFloat(x.substring(x.indexOf(":") + 1)),
          };
        } else if (x.startsWith("not_")) {
          if (temp.$and) {
            temp.$and.push({ [key]: { $ne: x.substring(4) } });
          } else {
            temp.$and = [{ [key]: { $ne: x.substring(4) } }];
          }
        } else {
          if (temp.$or) {
            temp.$or.push({ [key]: x });
          } else {
            temp.$or = [{ [key]: x }];
          }
        }
      });
      if (matchStage["$and"]) {
        matchStage["$and"].push(temp);
      } else {
        matchStage["$and"] = [temp];
      }
    }
  }

  return matchStage;
};
