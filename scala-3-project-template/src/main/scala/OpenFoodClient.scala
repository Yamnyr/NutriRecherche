package app

import cats.effect.IO
import org.http4s._
import org.http4s.client._
import org.http4s.implicits._
import org.http4s.circe.CirceEntityCodec._

class OpenFoodClient(client: Client[IO]) {

  /** Recherche OpenFoodFacts brute (API OFF) */
  def rawSearch(query: String): IO[SearchResponse] = {
    val uri = uri"https://world.openfoodfacts.org/cgi/search.pl"
      .withQueryParams(
        Map(
          "search_terms" -> query,
          "search_simple" -> "1",
          "action" -> "process",
          "json" -> "1",
          "page_size" -> "200"
        )
      )

    client.expect[SearchResponse](Request[IO](method = Method.GET, uri = uri))
  }

  /** Récupère un produit par code-barres */
  def getProduct(barcode: String): IO[Product] = {
    val uri = uri"https://world.openfoodfacts.org/api/v0/product" / s"$barcode.json"

    client.expect[ProductResponse](Request[IO](Method.GET, uri)).map { resp =>
      resp.product.getOrElse(
        Product(
          code = barcode,
          product_name = None,
          brands = None,
          categories = None,
          quantity = None,
          nutriscore_grade = None,
          ecoscore_grade = None,
          image_url = None,
          image_small_url = None,
          nutriments = None
        )
      )
    }
  }
}
