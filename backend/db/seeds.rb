require 'rest-client'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Beer.destroy_all

response_string = RestClient.get("https://sandbox-api.brewerydb.com/v2/beers/?withBreweries=Y&key=f3e3ff2705f5419c9afada4efbaddb19")

beers_array = JSON.parse(response_string)["data"]

beers_array.each do |beer|
  if beer["style"] != nil
    style = beer["style"]["name"]
    description = beer["style"]["description"]
  else
    style = "Unknown"
    description = "Unknown"
  end

  if beer["labels"] != nil
    image = beer["labels"]["large"]
  else
    # image = "https://d29fhpw069ctt2.cloudfront.net/icon/image/84662/preview.svg"
    image = "https://image.flaticon.com/icons/svg/168/168557.svg"
  end

  Beer.create({
  name: beer["name"],
  image: image,
  style: style,
  description: description,
  })
end
