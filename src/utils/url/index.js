 const isUrl = string => {
      try { return Boolean(new URL(string)); }
      catch(e){ return false; }
 }

module.exports.isUrl = isUrl
