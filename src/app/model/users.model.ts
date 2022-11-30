export class UsersModel {
  constructor(
    public user_id: number = 0,
    public f_name: string = "",
    public l_name: string = "",
    public password: string = "",
    public phone: string = "",
    public email: string = "",
    public picture_url: string = "",
    public affiliation: string = "",
    public affiliation_id: string = "",
    public position: string = "",
    public position_id: string = "",
    public rank: string = "",
    public rank_id: string = "",
    public type: string = "",
    public type_id: string = "",
    public status: number = 0
  ){

  }
}
