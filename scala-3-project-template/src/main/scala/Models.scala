package app

import io.circe._
import io.circe.generic.semiauto._

// ----------------------------------------------------
// Nutriments (décodage manuel des champs *_100g)
// ----------------------------------------------------
case class Nutriments(
  energy: Option[Double],
  sugars: Option[Double],
  salt: Option[Double],
  fat: Option[Double]
)

object Nutriments {

  given Decoder[Nutriments] = new Decoder[Nutriments] {
    def apply(c: HCursor): Decoder.Result[Nutriments] =
      for {
        energy <- c.downField("energy-kcal_100g").as[Option[Double]]
        sugars <- c.downField("sugars_100g").as[Option[Double]]
        salt   <- c.downField("salt_100g").as[Option[Double]]
        fat    <- c.downField("fat_100g").as[Option[Double]]
      } yield Nutriments(energy, sugars, salt, fat)
  }

  given Encoder[Nutriments] = deriveEncoder[Nutriments]
}

// ----------------------------------------------------
// Le modèle Product (structure interne)
// ----------------------------------------------------
case class Product(
  code: String,
  product_name: Option[String],
  brands: Option[String],
  categories: Option[String],
  quantity: Option[String],
  nutriscore_grade: Option[String],
  ecoscore_grade: Option[String],
  image_url: Option[String],
  image_small_url: Option[String],
  nutriments: Option[Nutriments]
)

object Product {
  given Decoder[Product] = deriveDecoder
  given Encoder[Product] = deriveEncoder
}

// ----------------------------------------------------
// Réponse API OFF pour /product/code
// ----------------------------------------------------
case class ProductResponse(
  code: String,
  product: Option[Product]
)

object ProductResponse {
  given Decoder[ProductResponse] = deriveDecoder
  given Encoder[ProductResponse] = deriveEncoder
}

// ----------------------------------------------------
// Réponse de recherche
// ----------------------------------------------------
case class SearchResponse(
  count: Int,
  products: List[Product]
)

object SearchResponse {
  given Decoder[SearchResponse] = deriveDecoder
  given Encoder[SearchResponse] = deriveEncoder
}
