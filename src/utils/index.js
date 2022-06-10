// 默认配置
const defaultCofnig = {
  type: "localStorage", // 类型 localStorage | sessionStorage
  prefix: "", // 前缀
  expire: null, // 有效期 默认无限期,单位分钟
};

// 配置校验规则
const configValidaterMap = {
  type: (val) => ["localStorage", "sessionStorage"].includes(val),
  prefix: (val) => typeof val === "string" || typeof val === "number",
  expire: (val) => typeof val === "number" && val > 0 ,
};

// 解析输入配置得到最终配置
export const parseConfig = (config) => {
  if (
    Object.prototype.toString.call(config) !== "[object Object]" ||
    JSON.stringify(config) === "{}"
  ) {
    return defaultCofnig;
  }
  const result = {};
  Object.entries(defaultCofnig).forEach(([key, val]) => {
    const _val = config[key];
    const validater = configValidaterMap[key];
    if (validater(_val)) {
      result[key] = _val;
    } else {
      result[key] = val;
    }
  });
  return result;
};

export const isEmpty = (val) => {
  return val == null || val === "";
};
