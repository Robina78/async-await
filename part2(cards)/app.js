 let url = "https://deckofcardsapi.com/api/deck";


 // Part 1
 async function getCard() {
     let resp = await $.getJSON(`${url}/new/draw/`);
     
        console.log(resp)
        
        let {value, suit} = resp.cards[0]
        console.log(` ${value} of ${suit}`)

 }


 // Part 2
async function getTwoCards() {
    const firstCard = await $.getJSON(`${url}/new/draw/`);  
 
    let deckId = firstCard.deck_id

    const secondCard = await $.getJSON(`${url}/${deckId}/draw/`);
    console.log(secondCard)
    Array.of(firstCard, secondCard).forEach(card => {
        let { value, suit } = card.cards[0];
        console.log(`${value} of ${suit}`);
    });
         
}


// Part 3

async function cardDraw() {
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let data = await $.getJSON(`${url}/new/shuffle/`)


    $btn.show().on('click', async function() {
    
        let cardData = await $.getJSON(`${url}/${data.deck_id}/draw/`);
        
        let cardImg = cardData.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;

        $cardArea.append(
            $('<img>', { 
                src : cardImg,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
            if (cardData.remaining === 0) $btn.remove();
    })
    
} 
cardDraw();   
