const fetch = require("node-fetch");
const fs = require("fs");
fetch(`https://api.popcorn.moe/graphql` || `http://localhost:3030/graphql`, {
	headers: { "Content-Type": "application/json" },
	method: "POST",
	body: JSON.stringify({
		query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
	})
})
	.then(res => res.json())
	.then(result => {
		// here we're filtering out any type information unrelated to unions or interfaces
		const filteredData = result.data.__schema.types.filter(
			type => type.possibleTypes !== null
		);
		result.data.__schema.types = filteredData;
		fs.writeFile(
			"./fragmentTypes.json",
			JSON.stringify(result.data, null, 2),
			err => {
				if (err) console.error("Error writing fragmentTypes file", err);
				console.log("Fragment types successfully extracted!");
			}
		);
	});
