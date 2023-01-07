// Define as variáveis globais
var betterttv_emotes, seventv_emotes;

// Obtém a lista de emotes do canal em diferentes providers
async function fetch_external_emotes(credentials = { twitch_username, twitch_user_id }) {
    // Provider: BetterTTV
    betterttv = await fetch(`https://api.betterttv.net/3/cached/users/twitch/${credentials.twitch_user_id}`);
    betterttv_emotes = await betterttv.json();

    // Provider: 7TV
    seventv = await fetch(`https://api.7tv.app/v2/users/${credentials.twitch_username}/emotes`);
    seventv_emotes = await seventv.json();
}

// Obtém um emote a partir de seu `name` no CDN da BetterTTV
function get_betterttv_emote_by_name(emoteName, srcOnly = false, emoteSize = "1x") {
    emote = betterttv_emotes?.sharedEmotes?.find(el => el.code == emoteName);

    emoteSrc = `https://cdn.betterttv.net/emote/${emote?.id}/${emoteSize}`;
    resultImg = `<img src="${emoteSrc}" alt="${emoteName}, by ${emote?.user.name}" />`;

    return (emote) ?
        (srcOnly) ? emoteSrc : resultImg
        : null;
}

// Obtém um emote a partir de seu `name` no CDN da 7TV
function get_seventv_emote_by_name(emoteName, srcOnly = false, emoteSize = "1x") {
    size = parseInt(emoteSize.replace(/\D/g, "")) || 1; // Extrai apenas o dígito do tamanho solicitado

    emote = seventv_emotes?.find(el => el.name == emoteName);
    emoteSrc = emote?.urls[size - 1][1];

    resultImg = `<img src="${emoteSrc}" alt="${emoteName}, by ${emote?.owner.login}" />`;

    return (emote) ?
        ((srcOnly) ? emoteSrc : resultImg)
        : null;
}
