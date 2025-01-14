/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const { general } = require("../data/tickets");
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
function calculateTicketPrice(ticketData, ticketInfo) {
  let total = 0
  // happy case; general admission and membership admission with no extras.
  if(ticketInfo.ticketType === 'general' && ticketInfo.entrantType === 'adult'){
    total += ticketData.general.priceInCents.adult
  }
  if(ticketInfo.ticketType === 'general' && ticketInfo.entrantType === 'child'){
    total += ticketData.general.priceInCents.child
  }
  if(ticketInfo.ticketType === 'general' && ticketInfo.entrantType === 'senior'){
    total += ticketData.general.priceInCents.senior
  }
  if(ticketInfo.ticketType === 'membership' && ticketInfo.entrantType === 'adult'){
    total += ticketData.membership.priceInCents.adult
  }
  if(ticketInfo.ticketType === 'membership' && ticketInfo.entrantType === 'child'){
    total += ticketData.membership.priceInCents.child
  }
  if(ticketInfo.ticketType === 'membership' && ticketInfo.entrantType === 'senior'){
    total += ticketData.membership.priceInCents.senior
  }
// for the extras
  if(ticketInfo.extras.length > 0){
    for (let i = 0; i < ticketInfo.extras.length; i++){
      if(ticketInfo.extras[i] === 'movie'){ // if extra movie
      total += 1000
      // total += ticketData.extras[extra].priceInCents[ticketInfo.entrantType]
      }
      if(ticketInfo.extras[i] === 'education' && ticketInfo.entrantType === 'child'){
        total += 1000
    } else if (ticketInfo.extras[i] === 'education' && (ticketInfo.entrantType === 'adult' || ticketInfo.entrantType === 'senior')){
      total += 1200
    }
    if(ticketInfo.extras[i] === 'terrace' && ticketInfo.entrantType === 'child'){
      total += 500
  } else if (ticketInfo.extras[i] === 'terrace' && (ticketInfo.entrantType === 'adult' || ticketInfo.entrantType === 'senior')){
    total += 1000
  }

  }
}

  return total
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
function purchaseTickets(ticketData, purchases) {
  let total = []
  let output = ''
  let GenAdm = 'Adult General Admission: '
  output += `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`
  // we need to iterate through our array of objects
  for (const purchase of purchases) {
    if(purchase.ticketType === 'general' && purchase.entrantType === 'adult'){
      output += 'Adult General Admission: '
     total.push(ticketData.general.priceInCents.adult) 
    }
    if(purchase.ticketType === 'general' && purchase.entrantType === 'child'){
      output += 'Child General Admission: '
      total.push(ticketData.general.priceInCents.child) 
     }
     if(purchase.ticketType === 'general' && purchase.entrantType === 'senior'){
      output += 'Senior General Admission: '
      total.push(ticketData.general.priceInCents.senior) 
     }
     if(purchase.ticketType === 'membership' && purchase.entrantType === 'adult'){
      output += 'Adult Membership Admission: '
      total.push(ticketData.membership.priceInCents.adult) 
     }
     if(purchase.ticketType === 'membership' && purchase.entrantType === 'child'){
      output += 'Child Membership Admission: '
      total.push(ticketData.membership.priceInCents.child) 
     }
     if(purchase.ticketType === 'membership' && purchase.entrantType === 'senior'){
      output += 'Senior Membership Admission: '
      total.push(ticketData.membership.priceInCents.senior) 
     }
     if(purchase.extras.length > 0){
      for (let i = 0; i < purchase.extras.length; i++){
        if(purchase.extras[i] === 'movie'){ // if extra movie
        total.push(1000)
        // total += ticketData.extras[extra].priceInCents[ticketInfo.entrantType]
        }
        if(purchase.extras[i] === 'education' && purchase.entrantType === 'child'){
          total.push(1000)
      } else if (purchase.extras[i] === 'education' && (purchase.entrantType === 'adult' || purchase.entrantType === 'senior')){
        total.push(1200)
      }
      if(purchase.extras[i] === 'terrace' && purchase.entrantType === 'child'){
        total.push(500)
    } else if (purchase.extras[i] === 'terrace' && (purchase.entrantType === 'adult' || purchase.entrantType === 'senior')){
      total.push(1000)
    }
  }
  // if(total.length === 0){
    // output += `$${(total[0]/100).toFixed(2)}`
    // output += `\n-------------------------------------------\nTOTAL: $${(total[0]/100).toFixed(2)}`
  // }
  // output += `$${(total[0]/100).toFixed(2)}`
 }
// output
// start of output ( barebones )
// if(total.length === 0){
//   output += `$${(total[0]/100).toFixed(2)}`
//   output += `\n-------------------------------------------\nTOTAL: $${(total[0]/100).toFixed(2)}`
// }
if(purchase.extras.length === 0){ // if we are not given an extra
output += `$${(total[0]/100).toFixed(2)}`
output += `\n-------------------------------------------\nTOTAL: $${(total[0]/100).toFixed(2)}`
} else if(purchase.extras.length > 0){ // put a for loop inside of this if else to iterate through our extras array with similar logic as above.....
  console.log('okay')
}
} // end of our for loop

// for(const purchase of purchases){
//   if(purchase.ticketType === 'general' && purchase.entrantType === 'adult'){
//     output += 'Adult General Admission: '
//    }
// }


console.log(output)
return output
} // end of our function
    // for (const pur of purchase) {
    //   if(pur.ticketType === 'general'){
    //     return true
    //   } 
    // }
  
    // for (const i = 0;i < purchases.length; i++){
    //   if(purchase[i].ticketType === 'general'){
  //       return true
  //     }
  //   }
  // }
  //  if(total.length === 0){
//   output = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${}Adult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00`
// }

// if(total === 0){ // for the error clause

// return total
// }

// lets format
// if (total.length = 0){
// }


// return (total[0]/100).toFixed(2)



// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
