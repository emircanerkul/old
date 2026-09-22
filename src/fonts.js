/**
 * Cool Text font tables.
 *
 * Ported 1:1 from the original PHP implementation (see legacy/core/core.php).
 * Every font is a positional mapping over DEFAULT_CHARSET: the Nth character of a
 * font replaces the Nth character of DEFAULT_CHARSET in the styled output.
 *
 * Quirks inherited from the PHP source (kept for fidelity):
 *   - "oldo" and "slam" carry one extra trailing character that is never used.
 *   - "scool" defines no digit glyphs and "balls" only seven of them, so digits
 *     past the end of those tables pass through unchanged (see cool-text.js).
 */

/** Characters the styler knows how to replace: a-z, ? * < > and 0-9. */
export const DEFAULT_CHARSET = "abcdefghijklmnopqrstuvwxyz?*<>0123456789";

/** Font name -> styled replacement characters, ordered like PHP's ksort(). */
export const FONTS = {
  "adel": "ᏗᏰፈᎴᏋᎦᎥᏂᎥᏠᏦᏝᎷᏁᎧᎮᎤᏒᏕᏖᏬᏉᏇጀᎩፚໃ*《》0123456789",
  "arabia": "äßçÐعFgђ¡ʖkℓм₪٥ÞQя§тµ√ШҲγž?*<>0123456789",
  "balls": "ⓐⓑ©ⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ!?⊛<>๏,⊜⊕⊝()", // 38 chars
  "ballsbig": "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ?*<>0①②③④⑤⑥⑦⑧⑨",
  "bigger": "ÁßČĎĔŦĞĤĨĴĶĹМŃŐРQŔŚŤÚVŴЖŶŹ?*<>0①②③④⑤⑥⑦⑧⑨",
  "changed": "αв¢∂єƒgнιנкℓмησρqяѕтυνωχуz?*◁▷0123456789",
  "chiffres": "ábćdéfghíjklmńőpqŕśtúvwxýź?*<>0123456789",
  "cool": "Λɓ¢Ɗ£ƒɢɦĩʝҚŁɱהøṖҨŔŞŦŪƔωχ¥Ẑ?*<>0123456789",
  "craxy": "ἇḇϾÐἕŦ₲ḩł|₭ŁMΠØ₱ǪΓ₰₮ὒ√ⱲЖὟZ?*<>0①②③④⑤⑥⑦⑧⑨",
  "death": "αßςdεƒghïյκﾚmη⊕pΩrš†u∀ωxψz?*《》0123456789",
  "devil": "ⓐßʗðⓔƒɠнìʖҜℓмиѺρҨяƧ†µƔŴӾ¥ẕ?☆()0ı2ʓ45бך89",
  "egipt": "αβcδεŦĝhιjκlʍπøρφƦ$†uυωχψz?☆<>0ı2ʓ45бך89",
  "enet": "@฿©ᖱ⺕Ⅎᕥ♄ꀧวkᘂ๓₦፨℗q®ᔓ꓄มvฟxຯʐ?*『』0ı2ʓ45бך89",
  "flip": "ɐbɔdǝɟbɥıƪʞ1ɯnodbɹsʇnʌʍxʎz?*<>0ı2ʓ45бך89",
  "funmsn": "ÂßĈÐЄŦǤĦĪʖҚĿПИØPҨR$ŦЦVЩX￥Ẕ?☆『』0ı2ʓ45бך89",
  "funny": "ªb¢ÞÈF♀ޔÎjΚ¦∞η◊pÕrS⊥µ√w×ýz?☆◁▷0ı2ʓ45бך89",
  "grant": "ᗩ♭ᑥđĕſƓꀌĨĵƘŁɱƝōƤƢᖆƧŢᑌƔŵ྾ŶŹ¿*《》0123456789",
  "haxxor": "4BCD3FGH1JKLMN0PQR57UVXWYZ?*『』0ı2ʓ45бך89",
  "japan": "ﾑ乃ζÐ乇ｷǤんﾉﾌズﾚᄊ刀ԾｱQ尺丂ｲЦЏЩﾒﾘ乙?*()ᅙ1ᆯЗ456ᆨ89",
  "liebe": "ΛßƇDƐFƓĤĪĴҠĿMИ♥ṖҨŔSŦƱ√ѠӾYZ?☆()0①②③④⑤⑥⑦⑧⑨",
  "love": "ɑвς∂єƒɢɦɨʆќℓʍиღρҩʀsтµνωхγẕ?*<>0123456789",
  "magic": "Λв¢∂єƒgнιנкℓмηΩρqяѕтυνωχуz?+«»0123456789",
  "nicks": "αв¢∂єƒgнιנкℓмησρqяѕтυνωχуz?*<>0ı2ʓ45бך89",
  "oldo": "ค๒ς๔єŦﻮђเןкl๓ภ๏קợгรtยשฬץאz!؟●«»0ı2ʓ45бך89", // 41 chars
  "scool": "ᗑቄ￠꒯ﾼ￡ﻯꎧｴ｣ｋ꒒⋔ℕꑙℙ℺ℜ꒚ￓ꒤꒷꒳꒽ꐮẔ﹖*『』", // 30 chars
  "slam": "ǞвटDęբg৸ijκlɱПΦРqЯsƮЦvЩжყւ!?*()012ʓ45б789", // 41 chars
  "spike": "ΛБϾÐΞŦGҢł|КŁMΠØPǪΓSƮЦVЩЖЧZ?☆《》0123456789",
  "style": "ΛbćdΣfghíjklmńøpqŕśtúvwxýź?☆◁▷0ı2ʓ45бך89",
  "tamil": "ԹՅՇԺȝԲԳɧɿʝƙʅʍՌԾρφՐՏԵՄעաՃՎՀ?☆()θΙՁკЧƼбלȣף",
  "tattoe": "Æþ©Ð∃ζ∉ΗЇ¿¤∠mÑΘ¶ØҐŠτυ¥wχyշ?☆◁▷0ı2ʓ45бך89",
  "western": "ΛBCDΣFGΉIJΚŁMПOPQЯSTЦVШXΫZ?*<>0123456789",
  "wigly": "ªb¢ÞÈF૬ɧÎjΚĻмη◊ǷƍrS⊥µ√w×ýz?*<>0ı2ʓ45бך89",
};
