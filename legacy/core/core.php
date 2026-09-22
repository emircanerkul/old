<?php

class CoolText
{
    private $default = "abcdefghijklmnopqrstuvwxyz?*<>0123456789";
    private $fonts = [
        'chiffres' => 'ábćdéfghíjklmńőpqŕśtúvwxýź?*<>0123456789',
        'changed' => 'αв¢∂єƒgнιנкℓмησρqяѕтυνωχуz?*◁▷0123456789',
        'haxxor' => '4BCD3FGH1JKLMN0PQR57UVXWYZ?*『』0ı2ʓ45бך89',
        'oldo' => 'ค๒ς๔єŦﻮђเןкl๓ภ๏קợгรtยשฬץאz!؟●«»0ı2ʓ45бך89',
        'egipt' => 'αβcδεŦĝhιjκlʍπøρφƦ$†uυωχψz?☆<>0ı2ʓ45бך89',
        'spike' => 'ΛБϾÐΞŦGҢł|КŁMΠØPǪΓSƮЦVЩЖЧZ?☆《》0123456789',
        'balls' => 'ⓐⓑ©ⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ!?⊛<>๏,⊜⊕⊝()',
        'ballsbig' => 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ?*<>0①②③④⑤⑥⑦⑧⑨',
        'love' => 'ɑвς∂єƒɢɦɨʆќℓʍиღρҩʀsтµνωхγẕ?*<>0123456789',
        'craxy' => 'ἇḇϾÐἕŦ₲ḩł|₭ŁMΠØ₱ǪΓ₰₮ὒ√ⱲЖὟZ?*<>0①②③④⑤⑥⑦⑧⑨',
        'liebe' => 'ΛßƇDƐFƓĤĪĴҠĿMИ♥ṖҨŔSŦƱ√ѠӾYZ?☆()0①②③④⑤⑥⑦⑧⑨',
        'flip' => 'ɐbɔdǝɟbɥıƪʞ1ɯnodbɹsʇnʌʍxʎz?*<>0ı2ʓ45бך89',
        'wigly' => 'ªb¢ÞÈF૬ɧÎjΚĻмη◊ǷƍrS⊥µ√w×ýz?*<>0ı2ʓ45бך89',
        'japan' => 'ﾑ乃ζÐ乇ｷǤんﾉﾌズﾚᄊ刀ԾｱQ尺丂ｲЦЏЩﾒﾘ乙?*()ᅙ1ᆯЗ456ᆨ89',
        'tamil' => 'ԹՅՇԺȝԲԳɧɿʝƙʅʍՌԾρφՐՏԵՄעաՃՎՀ?☆()θΙՁკЧƼбלȣף',
        'slam' => 'ǞвटDęբg৸ijκlɱПΦРqЯsƮЦvЩжყւ!?*()012ʓ45б789',
        'death' => 'αßςdεƒghïյκﾚmη⊕pΩrš†u∀ωxψz?*《》0123456789',
        'tattoe' => 'Æþ©Ð∃ζ∉ΗЇ¿¤∠mÑΘ¶ØҐŠτυ¥wχyշ?☆◁▷0ı2ʓ45бך89',
        'funny' => 'ªb¢ÞÈF♀ޔÎjΚ¦∞η◊pÕrS⊥µ√w×ýz?☆◁▷0ı2ʓ45бך89',
        'cool' => 'Λɓ¢Ɗ£ƒɢɦĩʝҚŁɱהøṖҨŔŞŦŪƔωχ¥Ẑ?*<>0123456789',
        'bigger' => 'ÁßČĎĔŦĞĤĨĴĶĹМŃŐРQŔŚŤÚVŴЖŶŹ?*<>0①②③④⑤⑥⑦⑧⑨',
        'magic' => 'Λв¢∂єƒgнιנкℓмηΩρqяѕтυνωχуz?+«»0123456789',
        'western' => 'ΛBCDΣFGΉIJΚŁMПOPQЯSTЦVШXΫZ?*<>0123456789',
        'arabia' => 'äßçÐعFgђ¡ʖkℓм₪٥ÞQя§тµ√ШҲγž?*<>0123456789',
        'devil' => 'ⓐßʗðⓔƒɠнìʖҜℓмиѺρҨяƧ†µƔŴӾ¥ẕ?☆()0ı2ʓ45бך89',
        'style' => 'ΛbćdΣfghíjklmńøpqŕśtúvwxýź?☆◁▷0ı2ʓ45бך89',
        'nicks' => 'αв¢∂єƒgнιנкℓмησρqяѕтυνωχуz?*<>0ı2ʓ45бך89',
        'funmsn' => 'ÂßĈÐЄŦǤĦĪʖҚĿПИØPҨR$ŦЦVЩX￥Ẕ?☆『』0ı2ʓ45бך89',
        'enet' => '@฿©ᖱ⺕Ⅎᕥ♄ꀧวkᘂ๓₦፨℗q®ᔓ꓄มvฟxຯʐ?*『』0ı2ʓ45бך89',
        'adel' => 'ᏗᏰፈᎴᏋᎦᎥᏂᎥᏠᏦᏝᎷᏁᎧᎮᎤᏒᏕᏖᏬᏉᏇጀᎩፚໃ*《》0123456789',
        'scool' => 'ᗑቄ￠꒯ﾼ￡ﻯꎧｴ｣ｋ꒒⋔ℕꑙℙ℺ℜ꒚ￓ꒤꒷꒳꒽ꐮẔ﹖*『』',
        'grant' => 'ᗩ♭ᑥđĕſƓꀌĨĵƘŁɱƝōƤƢᖆƧŢᑌƔŵ྾ŶŹ¿*《》0123456789',
    ];

    /**
     * Make Style
     *
     * @param String $text This value is convert styled text by this method.
     * @return void
     */
    public function makeCool($text)
    {
        $result = [];
        $characters = str_split($text);

        ksort($this->fonts);
        foreach ($this->fonts as $fontIndex => $fontValue) {

            $coolText = "";

            foreach ($characters as $textIndex => $textValue) {
                $p = strpos($this->default, $textValue);
                if (!$p) {
                    $coolText .= $textValue;
                } else {
                    $coolText .= mb_substr($fontValue, $p, 1);
                }
            }

            array_push($result, [$fontIndex => $coolText]);
        }
        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }
}
