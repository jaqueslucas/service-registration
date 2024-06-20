
export interface UserDAO {
    insert_ticket(natureza: string, descricao: string, provedor: string): Promise<void>;
}
