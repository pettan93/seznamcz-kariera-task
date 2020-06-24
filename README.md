https://kariera.seznam.cz/380558-frontend-programator-pro-stranku-seznam-cz/

### Zadání úkolu
Vaším úkolem je implementovat funkci zipItems. Funkce má za úkol zamíchat do první sekvence hodnot hodnoty z generátoru druhé sekvence hodnot a vrátit vzniklou sekvenci jako pole. Funkce má použít všechny prvky z první sekvence a vložit prvky druhé sekvence na pozice určené zbylými argumenty. Výstupní sekvence musí končit položkou z první sekvence. Vstupní sekvence nemá být změněna.

Funkce zipItems obdrží následující argumenty:

- primaryItems – pole obsahující sekvenci hodnot do které mají být zamíchány hodnoty z druhé sekvence
- secondaryItemsFactory(n) – funkce, která obdrží kladné číslo n a vrátí n následujících položek z druhé sekvence jako pole. Funkce vždy vrací následující položky sekvence a neumožňuje “přetočení” na začátek
- offset – index (počítán od 0) na který má být vložena prvá položka z druhé sekvence
- period – perioda s jakou mají být vkládány položky z druhé sekvence do výsledné sekvence (t.j. ve výsledné sekvenci bude mezi 2 položkami z druhé sekvence právě period – 1 položek z první sekvence)
Předpokládejte že funkce zipItems vždy dostane platné hodnoty na vstupu.

Můžete použít libovolný imperativní nebo funkcionální programovací jazyk (s výjimkou ezoterických jazyků). V řešení nepoužívejte žádné knihovny nebo nástroje které nejsou součástí zvoleného jazyka.

###  Varianta pro pokročilé
V implementaci funkce zipItems zavolejte funkci generující položky druhé sekvence (secondaryItemsFactory) pouze jednou se správným argumentem (nesmíte vygenerovat ani jednu položku druhé sekvence navíc).

### Příklad použití a návratové hodnoty
zipItems([1000, 1001, 1002, 1003, 1004], secondaryItemsFactory, 1, 3)

[1000,0,1001,1002,1,1003,1004]

### JSFiddle playground
Pokud chcete k implementaci použít JavaScript, můžete využít následující předpřipravené prostředí:https://jsfiddle.net/8v3tLwgr/_