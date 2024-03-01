let searchButton = document.getElementById("search-button");
let backButton = document.getElementById("playlist-return");
let searchTitle = document.getElementById("title-search");
let searchArtist = document.getElementById("artist-search");
let searchAlbum = document.getElementById("album-search");

let playlist = [
  new Song("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBUVFRUZGBgaHCAdGxsaGx0bGhsgGxwaGxkaGxobIC0kGx0pIhgaJTclKy4wNDQ0GyM5PzkxPi0yNDABCwsLEA8QHhISHjIrIykyNTI0MjIyMjIyMjI0MjIyMjIyNTIyMjIyMjIyMDUyMjIyMjIyMjIyMDIyMDIyMjI1Mv/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYCBAcDAQj/xABKEAACAQIEAwQECQkGBQUBAAABAgADEQQSITEFQVEGEyJhMnGBkQcUQlJzobGy0SNTkpOiwdLh8BUkQ2JjcjM0grPCFiXD0/EX/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EACsRAAICAQMDAwMEAwAAAAAAAAABAhEhAxIxBBNBUWFxIqHRFJGx8DKBwf/aAAwDAQACEQMRAD8A6HxXEI7sndVGKHISGpKpLBW0z1AeY5dZppiUpsXalUsvi0qUGPhufRFS53Og1khX73Liu59Lvhfrl7ulmy+f8+cj8PUxTYbFd+VIFFxpf0sr7X1tlte/PaAW4GfZimwmUAREQBERAPkT5IPiPH+6rpQNJiX9EgrY621udJDaRaEHN0kTsSG4Xx5K1V6JVqdVN1a2o01BUkEeIe8STr1MqlrXsCbbXtrzhNVYlBxdNZPW0SO4JxNcTSWqqsoJIs1r6EjkSOU1OL8eGHqUqbU2Y1TZSpW17qNbkW1YSNyq/BZaU3JwSyvHwTsSG/txRVWjVRqTP6BbKVfqAyk2Oo0Ntx1kxJTTKyi41a5Fp9EiOGcZFWrWpZGU0iASbWN72tY+XPrJYGE0+BKDi6ZlE+T7JKiIiAIiIAiIgCIiAIiIBG/EGDOyVmXOcxAVCAcqrpdb7KJ54jhTOjoa72dSpstMGxBBF8nmZLRAPgE+xEAREQBE8+9HWfO+XrFEWZyldqQ3x/B5SAeRILAG53UEEj2iXLvV6iQnEeB061ZaxrVFZLZcpSy632ZDfXreVnFyVI6Om1Ywnufo1+6Kt8bbDYnGNUAfEZCVcaJbKthk3GltyfRt5nZfHVaS4F+8Z/jCnvQzEglglmUbKRm+TYaSwUOAUFeo7lqr1AQ7VCCSCLEAKAo0AGg5TCjwCipp5qjsKasKQYrZA25FgCxAsAWvaw56zPty/vydb6rRxfpn3xWPRJlR4fiHoYTCVqbtc1mQpfwMpLEjLsScu+/i9Vprtr/zXD/pP/koySw/ZygndjOzJSbOqMQQH+cTbMTe5te1ydOU9uL8Ep4h6dRqrq1M3XKUspupv4lN9VU69I7cttfH2D6rTeqp/Ofnj9iI+Ef/AIdDL6feeG2/onb25fqnia9ania+GerUJqqvcNmN1LHcW3scx15Uz1N7CnCaXeLVqu1V09EuVsnmqqAoO2tr6Ca+DDVq61qtHumo51W5vmzFQpUjcZQ36WnOS4PdfqUh1Ee2o8pJ5927VfsVxS6VOJZKwpFTT8bkmw8V9dTc7aa66a6xU4hUFTGIr1VQUe8QMzZlYCmQQWYsoNycpPOxHKTuI7LUH74tVqHviGbVN1JKkeHlcj29dYq9l6JZ376qC6ZHOYMSNASSyk3so8hyAle3Lwv7k1/U6Ldy9F49K/DIjh+KrLV4eTWqN3yNnVmup008PUX3303l+ldp9nqSnDsK1T8gLJ6FiOebwa6actuusnu9XrNIRkuTj6nVhNpx9/5/B6xPLvh1+ox3w6/UZejmtHtERBIiIgCIiAIiIAiIgCIiAfIkLX7Q0UIWpUpo1r5XqKptqL2OttD7piO1OG/PUf1qSLRNMqvFqP5XiZVVGU0GzjR6fhuzoNLtvpmW/Uzfx3FKlRKlxTeilSkuquHbOaTIxswsRmv7BpNypjuHsXLNQYuQXvVUh8vo5gTZrcr7TJuIYE5wWoeNgzflV8TL6JOu40t6h0nR34ur8V/CX/DkXTzV0+b/AJPFe0VfOVCIw7zEU1UXBJoqWQli1hcix053nniuI1nQGrTQpnw2W6Ol2dlL2u4PhNrcuRvYz0xGIwLKy56Kls5zCqhINRcrsLkgkje41nlgfiVO/jolTl8IqjJdCSrWZ28Wu9+UhammslnpavDeDL/1HiA5XLTa74lVFiDegt0JYtbXY/bNn41Wq0MX3qjIKXhJRkLFqWZ9GOwJtt7SQZhiamCdWW9JSc9mD0yVNQZXYXJF2G/WefDzg6XeAPSy1FCsi1AEIF9cpY6nNY67Aab3h6mnVrkhaWrdN2vn2PnZWs2akmYBFwtJstrC7XzG997qDf8A/Z4Y3FstTEq9ymJoO6BhYBkQgoAf8mUnzElExWDGwoiyZPTT0NfCDf0dTp5mMVjcHUCh+6YL6N6im2ljbXppHehusn9PPalfBpdl0Ge1hrg8PfTfR9+sg+BP3aYGp4UuK4DXt3hBYqtY2GWmLXv4reUs9LimCQnK9FTlCG1VAcq+iu+gHLpPGnjuHKAAcNYBlA7ymQA984UE6A3N7b3lu/HPv+KKvpp49vzZhQ7SuWyHJ4qlFFexAArUzUJysbn0bLe3pC40sfPD416eLcVCgqVFoqWVS1PNer5ggsFCi53PMCbC4nh2VlAw2VgoYZ6ViF9G+vKZtjMCwYHuCGChh3lOxCm6gi+wOole7DOC/Z1cW+D4in+0qxVVJ7lL3OXdjfUKb3sJEcC4q1KiyIq3VK9diQbEJUKhBa3nry00k9/a2DVzUz0g7DKW75MxA2F8201fj3DlXLfDhRfTvadvH6Q9LZrC42NtZPejVP2+xD6ed2n6/c+U+0VZmXKqBWrLTAZWzAPS70MfFuNrc/8ALvHDe0dasFC01LhVZgNMwNVqbFSzDKAqFtb3JA9eR4vw8tm7zD5s4e/fU/TAsG9Le2nqmNLH8OUoVOHBS+W1WnoCcxHpai+tjz1hzhXAWnq3yW2JBf8AqrC/n6P66n+M9MP2ho1CVp1KdRrXypURja4F7KSbXI185idNMmoiIIEREAREQBERAEREA4t2+Q/G1t+aT71SQCIeksXb3EBcUv0a/eeQtDiCc7zCd2dEVgwVT0m7hqJabeEqU35iTvD8ChO9r85hKZJD08EDbSSeG4Tfb+UlnwIQ20Np5I/itfSKbIsjanDrcpr08KS3lJ+qht7Jr0eYP1yziQmanxHynhUwRtLCaU+GjI2kbjn+LwTqTbqZpFKnIe4S74rDi505n7ZHYlciVCFNtiRtc6WJkxl4oteSAwyuSBLHT4ZlFtCec0eG0gWBsJYqKayk3nBdPBC4nAeUhOMYPItyOk6BRoqSWb0V19fQSt9oaZqXMQnkcopB0mVN9ZsVqFt9JqllXUt7AP3zpTsxao2Ct5Y/g+X+9t9G336crNPEpcAkgeqXXsRQpDEErUDN3Z08s9OWTyGdciImhkIiIAiIgCIiAIiIBxP4QEvi1+iX71SV2nSlk+EA/wB6X6Nfv1JXab7TGfLOiPBM8N4dmtLdgKIVSL3I/rSQfC6tQJYLoedtffJnCEhWLXB6WnLtblkls2aPiv7vq/nItMTc6bzfweguTrmG4tyA/oyOxFIrUqWRrE3BUZr315XtzGvSbVgpZP0qFhuTM0RRoSJr4Cp+SUNcXHytD9chuI4uopGVWJF72UsD7QPPrL0IxcnRO47FimAb87fVNCtxJxawGu2l9PfK9jsZUNEjI+bvANEY6ZTrYKTYdRNfE1awRb03J0sygsCLG1lC5lPW/QSriyXFLBt47jrKFJUHMzjQ5fRIHO/WaGK4oWpqo0VmLW58hrblpNaph6r0qahWBUvfMlT5WUjZTfYzXPDatj4dfJan/wBcKKBKcNxak2vYy1UH13vtOeJg6g3U/ouD9yT9PHuoUAN02Pr6SkoW8DwWmvV0tNCoucW+vpPBMSSNZktSykzKUS6ZFcY4YApOw6nn/XSUmol2I9st3FsXUqaWOUXsADbaVmqpGY+Qm2naWSs1ZpiXL4NP+cP0bffpymFpcvgze+MI/wBNvv05uZo7nERNDMREQBERAEREAREQDiPwjn+9L9Ev36kx7JcH71w7eiuvrPKbHbzBvVx1NEFyaaD9upLp2d4O1CmqG17azDUeToi6QOAyrpIYOGd1ufDbZjzv+EsnFa4p07toJRuz+I72tinGxC29maZxWaD4s9cbh2NgHcXNtHfz/CetPDMoNnfXe7tyH1yQrp6NwP6DT4V6S7RSyFq4Zzu7fpn+hPE4Q6A1XHX8o3TSTLOPV7ZiaSmmXU2cOEAJFiWy2v56kyibLJkSnDf9R/ZUPOZpgBzqVLfSNf3SYsQuoJbbRc2uYC420Gu/zTaajuflXXX5t233ygaCHZJrLgVHy3/WNPM4XxWFRwLXP5RvMcz5dOYm61ZcvPTXMQVBsNhmFzv15CYqw7y3LKv3nkWwaZwtiSGYk21zkn3zBsOTuT+lf98kVpa3y3Hl/WkClYi8lWQ2aCsV5zVx2PIFryTSne2l73lb42tgD/mI/ZX8ZKiSma5xFRrkk++eLrmRvICedF+V95v4XDjXc3kN0SlZComvrlr+Danlxp+jb79ORfEcKEIsJO/B4h+N5rad2wv556c1hKyjjR2oT7Pgn2bGIiIgCIiAIiIAiIgFAxGHDcRQ9KaffeW7LK6MMTjDUB/w1H7T/jJx6lluZzt5Zq8pFV+EckYS4NrOt/bcfhKr2EbSqCR8nb0tc2/O3854dtuL4irVGHViyMQAiqCWN/COt9prcLrrgxiruuc0UKLnV27wUyXQ5CbWdiNeQ5xDj5LyTSosPGO0+GoNlYu5B8WQA230JYgX8hJTCYyhWprUpvmRtiAbjqCLXBHSV7szhRRwhrvSRy1N6juzAvsSiC4NgVt7TKdWxjpXqqGakGJbLTc5bnmMthqNb2iLTbSIlBxSkdExOJw4JBrup8lqfuWReJqYVtPjlW+h9CoRcbH0JV6FaoVzZ3PU5z+8zCriifln9O/75daaIuuSfp0sLmv8bc6/mXufbkkphjhR/j1D66bfvpyhVMW3JyPUx/GYHG1OVR/Y7fjJemRvOkV6uERczVDYf6dj6gMm8jqfaLBioRmcL8/IuU28gM1tekqFeoRlZ2ZmAGpObfqTuBczReqPFY7/AIjltteVWmiW6OqcO4jha1+6qljzGUgjzsV9Xvm4aVPlc+z+U45Srsjfk3ZCRurFTqNrg+dpK8Ex1c4nDhq1VlNRAQajkHxC4IJ1EtsKbjpLpT1AJuDY6eQbp0IPtlP7W2A8JFsw6Ai6g3HO55+QHtuRHjrf7m/7dKUvty+q/wC8/wDbo/jK+S14IPDttJ/D0b07gyq4d9RrLdwKmzgrcnmJlqItGRnjMLcU+fWTnYzD5MQ+nyW++lpqvhmItbbykv2YpFawN7gofX6SSum3aRZ1R0hdplMU2EynacwiIgCIiAIiIAiIgFbpaVSf8i/eafeLYgJTJms73rZb/IB/af8ACRPbXEulIKtje4a+9iCNJy6lu6N4LKKJgMaP7WQ7gsVFx1Qg+og316SG7RY53xFYMocI7qHA1yX8IJSw0Atc+ck+z1E1OKF2GlNWqHT/ACZVv7XE83KrTY7M5LHqSxv/ACkSkoyWPCOrR0nqqWao3OAY2p/Z1RbZgrsqgPkbLlUk3ynMLsdCPbpKTiHYuxIIN5bOHU7DQAAeU2Hw4JuRrfcyIaijJuuTpl0DnBLd9iq8LAapTpuXCuwU5PT8RsLA6b2nUuFdmOHU794jsQQuZ6j2JewAIQhSDfpKfQ4xhUP5emXUXUqANGBAuQSNNzLBwntLw7J3dNWpC98pGhN73uG3vNe66umcGpoKMtsZWTfafhWGXhmLajhqdMqG1VFDXp1bHxAX1yH3zja1xpe9p1fGdoFZGprTz03zZwz2VsxJbRb3JJJN7bmR2H4ZgcQj03w6UmGqmnoxFtdRY6ab3FtdgZC116MmXR6iW6sFfw/B6mISp3YzFbEgb68wPZIvG8Hq07ComUC9jbfy98tPZXCla9fDpiHV+7urKVz+Bh4CWBU2zdNunKW41wtqtRKL130phiqlUzsWa7HwkECy6Wtv1kObUvYnYmuMnLCbeySHZ/XFYY/6qX/SEce4etCqaYqZyBdja1ifk6eX9COza/3rDH/UX7Zunas45Jp0dYI8Vb/c/wD26M552nxve06dS1ialRSL3tkWmm//AE39s6DVcKa7EgAFySdB/wAOlvOX8Sqg0KY595VP6WS32GUSyXf+JH0jYiX3shW+sfhOepvLn2NJz5iNBfX2DSRqIQeC2vWAvykhwAjvE1ucjc/86SFrODebvZRCK4PLIfvLMoqpIvijpSbCZTFNhMp1mAiIgCIiAIiIAiIgHPOI4spjQoNvyaHTzep+E2uOYTPRzHVlYH2T5xHhYfErU1v3aqPYzn98ksYo7sg/0ZzSTtm0Xwc+4LQNOvjKj/KRLHyOfN7bj6pRsdiz4QTc38R8g3hGnKwE6xwTgCulUuCVZsuUswAtqbBSL6MOfL3Yr2RwJOTuELNoLmoLsFYnKx3Gg58miMctvybPU2qo8+SkcMa9M26z7WoNb0l9xP75LcVwtGjiKlGiuREyi1ydba6k9bzUdAd5g3Ume9pLfpp+xVuE4bPWcsL5bn230/fLriOHYXu1LJndhptvz05AGQeGwWWoxVrBrZtBv5e+SYEakraaZzdN0m1fV6v/AGeKKqLlUBVUbDzm1gKTVHRVNmYix6aXJ9gBPsmlUoEq121Ounly1mnj6tem9OpSuO7BIK665beIW2IJHtMslZ06s3CDpH3idBuH48VKbZ2Fqmulw5cOht1F/VcSe4vxNs9PG01d0KWUZ1FNb7kjfMNQQTvfSUziXFHxNTvalg+UKbbeHT+ftlz+Drh1KpSxVKsMpfK6NdQcpV0OUXvbe+liGE6XC0r5PnO5tbrhnP8AHVWqO1R/SY39888NVem6uhyupBU6GxG2h0MsHarg4w9Qp3iuwIIynTKQbZhya/K50F+YleE0XoYSy7LVhu2jNTqpXQFqitaomgzMqqMych4BqOu0r2Na6i2vjb7qTWcTAObWvpe/tNtfqEiid7qjJBLv2bqZaQHmx+6JS0pm4HM7ed9teku1U06FQ06ZzIAut73JF2PvlNRWi+mjYfGrJ/snib4lFB/w2P7SSqVayEbiTXYZgcZv/ht9qTOEcmsqo68mw9UzmCbD1TOdJzCIiAIiIAiIgCIiAVbH1QGX/aPtaY0Wzi3tm5W4crlajH5NreombFOiqjQe6ZS5Lp0QGJx/cEIqMxc2CgXJJJta5sN9yZHpxALjaVIFCxzKDUqBACfzYtmqtbTQBRe1ydpziNOmzWbOCVIDK2W3O4bSx8/Kc/45SwtE1KtSpSdxqqLRo52PycztTJJ1F2BB0vKKK8mjk2sGj2l4fiMNi6tSpTLpXcd26aqTqSpG6tubH2EwjMSQylfIg+/WRGP7T4vFhVYqES2UC7MMtgPG5LljzYnW08hjHprYMx5kE29L2Xky00zr0OtlBZyi1cNoJUcKSRf0TewsoJYXCnXaSNbhdIbM/tIH1hCN+to7I4DNS7yt4c3ohNwuhsCdi25tyy85I1qBQN3dd0YggNlRiPVdbX99pn2W+DSfXNy5r2K5xCnSogGpUNm2AdXNhubIl7C4ueVxMFWgVXJiaQ+kq009tiQfqmxxHG0cJTCnLVquD3jEs71Lnwu5Ym2mwufISuDjOGrAU6tGzAZUcHQE6LmG6gG2oI2100MrSrlGb6zUXDRu4Ls02LxjksDh6ZCtUpm61CACURtM2pILDa2nKT+P4RTp1ENDwFRYLmOtzr4jc7MfqE2+ywSnSSiL5lpguQQUzj0yvPXfpYciZpdsKKGpRPjuASSjEXGnnvttuLy25qVeDJwcrk+XllZ4yiUyWr5ajMWUAMTcLcZ78jcWAlXDWWSmOwwQuwqE8vFYHXU2AsenLnIcnSdBwy5PrTC0yB0mIgG9gqR9K2g19p0H1g+6SNIzSweKIpinsMxY+Z5X6ga++SlN6RAzXB6r+BvMps2hweT1LSy/B1Vvjbf6bfakq+IUH0TeWP4OEIxy3/Nv9qRESZ29Nh6pnME2Hqmc1MhERAEREAREQBERAIKpiypCgfJv7y01GxbkkXt6p4cTJFRbHTIPvNPqopF7zi1JtSeTojBNWeONo51Ia5v5zkPaXBlLAC1iLgX1uCS1iAOXK41O3Prb4uxykj+uU5/2lcDvCBqG8WnINodOYHW5te0rDU+pZLyj9LKnwWqtOqO8OVGVlJtfLcaGw13FvaZvm7oWIB1IA0PpKhQA9eXrvJVOG0q1NGUb2vb12uPfNbGdn61Br0wfS23B0bVlOmxP6U61JN2ZRi1GkX3C4alg8FTNgcou9tS1SoRZQed2IQE9FlWx3aavqtSgaJzEkpURmyi4I8QIJzA9AbESMxHFajUVptdRdb6k02ynRwdGRwQDvbeQeKr1c7ZmJJ1JvqfWefSaJ4MpRp5LW2FpYqmK5LUwbgkhW8S6WLoSQtyB4hewvpIgcMp94KdNw5fIA5A3e2g6AX156TxFMFEYUwtqaKdACxA8TMQNSTfflYTb4Hhy1Uk3GVGb2m1Nbf8AU6n2TRKlZXk9aHE8R3zmiDkLZaYvY5VACksNyQoY3vqTN6nxpalRRUDZ7hTe1rAm+g9ZOl9BynsmHKoFRbb+R6H7JoDhzXZit9TcbixtY/bOeUU3TOyE5KLyXbh/C8HiKTZ1p1EJy3sLgjU+IaqwB6gi845WC5nyehmOS+vhucv1WnRuJVxhsGadBSpF/Fe5u97nUHYW36DWc8GHKy8VSpHLN3K2eIExtMmmIkmZtUNp7s81leM95SjRSwbKPLf8HFS+OH0bfakpwlr+DRv7+v0b/asUWs7qmw9UzmCbD1TOXKCIiAIiIAiIgCIiAc87Q5u/X5uQfeea78SsMom12lq2qAc8g+88icMQy6ieJrye9/J6mnp/QmR3FKrZlbMdCNvXNTtFg+8aoM7A2uFvZdhbSxzG4125SSrpT7xUUeL0m6C3L1zy4sTnW3Ma6dDuff1HtiEnuVciUU40Uvg/E3wz6jMh3Xoeq9DOmcE4zTxIJBF25HcEaTm5w5dXBHo3sbdORkdh8TUpG6sQL8vqnrJWee/p+Dp/EezYqZzcrf3X21EiMNwFqHiYBxbVTpp5GevCO1dQ0wH8Q/a05SyJxTD1clm1bQjpsPF01ItJVrCJecsqeekxAIK311HKWLA4enTpu66F/DtbQH8b/oiY8R4YuYAWta37jr6rzYrABxSGqqgtYEa31Oa9jcH7esu52iKVnkKSgG24W2w5+6R+GezMD09/laSb3F7eUiaAYuQyka6HqLmx+yQ0TGTyeOLYb87638v5Eyj4moCOnql+4lw/S49o6+rzlHxPDe7dqdS5Km1xoCNwfaCDLJpIzkm2RDa7QEm/Vw9O3hJB6el7b6WmNPBM3yhb3/VIbKqLNMCbVJQJm2GCa3zD3TWqVJF2TVcns7iWn4MW/wDcF+jf/wAZS80t3wXH/wBwT6N//GSQnk/QFPYeoTOedPYeoT0kkiIiAIiIAiIgCfJ9iAc57ScJxFSsHpqCmQDV1BuGcnQsDsRNWlwXFBSMignn3iaftTpfcr81fcI7lfmj3Cc8+lhJ2zrj1k1FRpYOc4fs/VXWyljuc6a/tTDF9nq7EHKht1dP3t5TpPcp80e4R3K/NHuErHpIJ3bKy6qb8I5xh+z1Qbovn40/ikBxrsDVck0lUX1saiW16eLSdm7lfmj3R3K/NHum8YJcGEpbuUcJwnYDHqjN+TDX0TvENxzOYNYer7IpdiuJK2ZaaqeorU/49Z3buV+aPdPncJ80e4S5WzmlPhuPellqUlDjZhVp2PLUBtDaYLwXHDXu1v5VEB+/OnfF0+avuEfF0+avuEUidxzOpwziPyVQ+TPTP1hrzNcFjANcIjN5V6aj62M6T3C/NX3Cfe5X5o9wiidxzdqGONv7mnq+MU/tvIHivZbH12DGlTS2lhWQne+9xz8uZnZu5X5o9wjuV+aPcJFDccLHYLHfm0/WU/4op9huIrtSS30tP+Kdz7hfmr7hPvcr81fcI2oizgtbsDxFv8Jf1qfxTwPwc8R/NJ+tT+KfoDuE+avuEfF0+YvuEmiHk/P/AP8AzjiH5pP1tP8Ailj7C9jcZhcYtWtTVUCMpK1EY3a1tFN+U678XT5g9wjuE+avuEUQZpsPVM58n2CRERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREA//Z", "Mr.Tambourine Man", "Bob Dylan", "https://classroom.google.com/u/2/h")
]; // Values only placed here manually for testing

let searchResults = []; // Values only placed here manually for testing

displayPlaylist(); // Start by displaying the playlist

backButton.addEventListener("click", function () {
  displayPlaylist();
  searchTitle.value = "";
  searchArtist.value = "";
  searchAlbum.value = "";
});

searchButton.addEventListener("click", function () {
  querySpotify();
  showSongList(searchResults);
  addPlusButtons();
  backButton.style.display = "inline";
});

function querySpotify() { // TODO: Use last.fm to get results, use coverartarchive.org for album covers
  // Use searchType as the filter for the search query
  // return list of songs
  searchResults = [];
  searchResults.push(new Song("" , searchTitle.value, searchArtist.value, ""));
  searchResults.push(new Song("", searchTitle.value, "Bad cover artist", ""));
  searchResults.push(new Song("", searchTitle.value, "Good cover artist", ""));
  for (let i = 0; i < 10; i++) {
    searchResults.push(new Song("", `${searchAlbum.value} - Track ${i + 1}`, searchArtist.value, ""));
  }
  for (let i = 0; i < 4; i++) {
    searchResults.push(new Song("", `Other song #${i + 1} by ${searchArtist.value}`, searchArtist.value, ""));
  }
}

function playlistContains(song) {
  for (let i = 0; i < playlist.length; i++) {
    if (playlist[i].songEquals(song)) {
      return true;
    }
  }
  return false
}

function addPlusButtons() { // Puts a button next to every search result to add it to the playlist
  for (let i = 0; i < searchResults.length; i++) {
    let button = document.getElementById("song-list").children[0].rows[i].insertCell().appendChild(document.createElement("input"));
    button.type = "button";
    button.value = "+";
    button.classList.add("plus-minus-buttons");
    let song = searchResults[i];
    if (!playlistContains(song)) {
      button.addEventListener("click", function () {
        if (!playlistContains(song)) {
          playlist.push(song);
          button.value = "✓";
        }
      });
    }
    else {
      button.value = "✓";
    }
  }
}

function addMinusButtons() { // Puts a button next to every song in the playlist to allow the user to remove it
  let rows = document.getElementById("song-list").children[0].rows;
  for (let i = 0; i < rows.length; i++) {
    let button = rows[i].insertCell().appendChild(document.createElement("input"));
    button.type = "button";
    button.value = "–";
    button.classList.add("plus-minus-buttons");
    button.addEventListener("click", function () {
      playlist.splice(i, 1);
      displayPlaylist();
    });
  }
}

function showSongList(songList) { // Fill a table with all of the data from the playlist and display it
  let tableHeaders = ["Album Cover", "Title", "Artist", "Link", ""];
  let table = document.createElement("table");
  
  let thead = document.createElement('thead');
  table.appendChild(thead);
  for (let i = 0; i < tableHeaders.length; i++) {
    thead.appendChild(document.createElement("th")).
      appendChild(document.createTextNode(tableHeaders[i]));
  }

  for (let i = 0; i < songList.length; i++) {
    table.insertRow();
    let row = table.rows[i];
    row.appendChild(document.createElement("td")).appendChild(document.createElement("img"));
    row.cells[0].classList.add("album-cover-cell");
    row.appendChild(document.createElement("td")).appendChild(document.createTextNode(songList[i].title));
    row.appendChild(document.createElement("td")).appendChild(document.createTextNode(songList[i].artist));
    row.appendChild(document.createElement("td")).appendChild(document.createElement("a"));

    let imgCell = row.cells[0].children[0];
    imgCell.src = songList[i].cover;
    imgCell.alt = "Album Cover";
    imgCell.classList.add("album-cover-images");
    
    let linkCell = row.cells[3].children[0];
    linkCell.href = songList[i].link;
    linkCell.target = "_blank";
    linkCell.innerHTML = "LINK";
  }
  
  let HTMLParent = document.getElementById("song-list");
  for (let i = HTMLParent.children.length - 1; i >= 0; i--) {
    HTMLParent.removeChild(HTMLParent.children[i])
  }
  HTMLParent.appendChild(table);
}

function displayPlaylist() { // All the function calls to display the playlist
  showSongList(playlist);
  addMinusButtons();
  backButton.style.display = "none";
}