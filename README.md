Tehtävänäsi on toteuttaa yksinkertainen pelimoottorin ja pelitilin (wallet) välinen integraatio,
jonka avulla voi ostaa pelejä ja maksaa voittoja.
Pelitilillä tarkoitetaan tässä yhteydessä palvelinta, joka tarjoaa HTTP API:n pelimoottoreille ja
hallinnoi asiakkaiden pelivaroja. Pelimoottoria ei tarvitse toteuttaa tässä harjoituksessa.
Voit valita käytettävän ohjelmointikielen ja tehdä muut tekniset ratkaisut itse.

Tehtävät:
Suunnittele ja dokumentoi pelimoottorin ja pelitilin välinen HTTP-rajapinta

- Veloittaessasi peliä pelimoottori välittää pelitilille ostotapahtuman yksilöivän tunnisteen,
pelaajan yksilöivän tunnisteen ja summan. Vastauksessa pelitili välittää pelimoottorille pelaajan
pelitilin jäljellä olevan saldon.

- Mikäli peliin tulee voitto pelimoottori välittää pelitilille voittotapahtuman yksilöivän tunnisteen,
pelaajan yksilöivän tunnisteen ja voittosumman. Vastauksessa pelitili välittää pelimoottorille
pelaajan pelitilin uuden saldon.

Kyseiset HTTP API:t ovat idempotent -tyyppisiä.

2. Suunnittele ja toteuta tietokanta pelitilille

Pelaajista tallennettavat tiedot:
- Pelaajan yksilöivä tunniste
- Nimi
- Pelitilin saldo

Pelitapahtumasta tallennettavat tiedot:
- Aikaleima
- Pelaajan yksilöivä tunniste
- Tapahtuman yksilöivä tunniste
- Tapahtuman tyyppi (osto tai voitto)
- Summa

3. Toteuta pelitili
Käsitellessään peliostoa pelimoottori veloittaa oston verran pelaajan pelitililtä. Jos pelaaja
voittaa, pelimoottori maksaa ne pelitilille.
Jos pelitilin saldo ei riitä ostoon, järjestelmä palauttaa pelimoottorille virheen.
Pelimoottorin ja pelitilin välinen liikenne pitää olla salattu.

4. Tee järjestelmälle testit
5. Kirjoita ohjeet pelimoottorin ja testien ajamiseen
6. Toimita valmis toteutuksesi meille ja valmistaudu keskustelemaan tekemistäsi ratkaisuista


Manually check DB 
docker exec -it mariadb_pelitili mariadb -u akuankka -pankkalinna1234 pelitili
