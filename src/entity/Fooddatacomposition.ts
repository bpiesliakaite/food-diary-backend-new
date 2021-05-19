import { PrimaryColumn, Column, Entity } from "typeorm";


@Entity("fooddatacomposition", { schema: "food-diary-db" })
export class Fooddatacomposition {

    @PrimaryColumn("varchar", { name: "Food Code", length: 7 })
    foodCode: string | null;

    @Column("varchar", { name: "Food Name", nullable: true, length: 91 })
    foodName: string | null;

    @Column("varchar", { name: "Description", nullable: true, length: 220 })
    description: string | null;

    @Column("varchar", { name: "Group", nullable: true, length: 3 })
    group: string | null;

    @Column("varchar", { name: "Previous", nullable: true, length: 28 })
    previous: string | null;

    @Column("varchar", { name: "Main data references", nullable: true, length: 255 })
    mainDataReferences: string | null;

    @Column("varchar", { name: "Footnote", nullable: true, length: 177 })
    footnote: string | null;

    @Column("varchar", { name: "Edible proportion", nullable: true, length: 3 })
    edibleProportion: string | null;

    @Column("varchar", { name: "Specific gravity", nullable: true, length: 3 })
    specificGravity: string | null;

    @Column("varchar", { name: "Total solids", nullable: true, length: 3 })
    totalSolids: string | null;

    @Column("varchar", { name: "Nitrogen conversion factor", nullable: true, length: 3 })
    nitrogenConversionFactor: string | null;

    @Column("varchar", { name: "Glycerol conversion factor", nullable: true, length: 18 })
    glycerolConversionFactor: string | null;

    @Column("varchar", { name: "WATER", nullable: true, length: 4 })
    water: string | null;

    @Column("varchar", { name: "TOTNIT", nullable: true, length: 4 })
    totnit: string | null;

    @Column("varchar", { name: "PROT", nullable: true, length: 4 })
    prot: string | null;

    @Column("varchar", { name: "FAT", nullable: true, length: 4 })
    fat: string | null;

    @Column("varchar", { name: "CHO", nullable: true, length: 18 })
    cho: string | null;

    @Column("varchar", { name: "KCALS", nullable: true, length: 5 })
    kcals: string | null;

    @Column("varchar", { name: "KJ", nullable: true, length: 6 })
    kj: string | null;

    @Column("varchar", { name: "STAR", nullable: true, length: 3 })
    star: string | null;

    @Column("varchar", { name: "OLIGO", nullable: true, length: 3 })
    oligo: string | null;

    @Column("varchar", { name: "TOTSUG", nullable: true, length: 18 })
    totsug: string | null;

    @Column("varchar", { name: "GLUC", nullable: true, length: 3 })
    gluc: string | null;

    @Column("varchar", { name: "GALACT", nullable: true, length: 2 })
    galact: string | null;

    @Column("varchar", { name: "FRUCT", nullable: true, length: 3 })
    fruct: string | null;

    @Column("varchar", { name: "SUCR", nullable: true, length: 18 })
    sucr: string | null;

    @Column("varchar", { name: "MALT", nullable: true, length: 3 })
    malt: string | null;

    @Column("varchar", { name: "LACT", nullable: true, length: 3 })
    lact: string | null;

    @Column("varchar", { name: "ALCO", nullable: true, length: 3 })
    alco: string | null;

    @Column("varchar", { name: "ENGFIB", nullable: true, length: 3 })
    engfib: string | null;

    @Column("varchar", { name: "AOACFIB", nullable: true, length: 3 })
    aoacfib: string | null;

    @Column("varchar", { name: "SATFAC", nullable: true, length: 4 })
    satfac: string | null;

    @Column("varchar", { name: "SATFOD", nullable: true, length: 4 })
    satfod: string | null;

    @Column("varchar", { name: "TOTn6PFAC", nullable: true, length: 4 })
    toTn6Pfac: string | null;

    @Column("varchar", { name: "TOTn6PFOD", nullable: true, length: 4 })
    toTn6Pfod: string | null;

    @Column("varchar", { name: "TOTn3PFAC", nullable: true, length: 4 })
    toTn3Pfac: string | null;

    @Column("varchar", { name: "TOTn3PFOD", nullable: true, length: 4 })
    toTn3Pfod: string | null;

    @Column("varchar", { name: "MONOFACc", nullable: true, length: 4 })
    monofaCc: string | null;

    @Column("varchar", { name: "MONOFODc", nullable: true, length: 4 })
    monofoDc: string | null;

    @Column("varchar", { name: "MONOFAC", nullable: true, length: 4 })
    monofac: string | null;

    @Column("varchar", { name: "MONOFOD", nullable: true, length: 4 })
    monofod: string | null;

    @Column("varchar", { name: "POLYFACc", nullable: true, length: 5 })
    polyfaCc: string | null;

    @Column("varchar", { name: "POLYFODc", nullable: true, length: 4 })
    polyfoDc: string | null;

    @Column("varchar", { name: "POLYFAC", nullable: true, length: 5 })
    polyfac: string | null;

    @Column("varchar", { name: "POLYFOD", nullable: true, length: 4 })
    polyfod: string | null;

    @Column("varchar", { name: "SATFACx6", nullable: true, length: 4 })
    satfaCx6: string | null;

    @Column("varchar", { name: "SATFODx6", nullable: true, length: 4 })
    satfoDx6: string | null;

    @Column("varchar", { name: "TOTBRFAC", nullable: true, length: 3 })
    totbrfac: string | null;

    @Column("varchar", { name: "TOTBRFOD", nullable: true, length: 3 })
    totbrfod: string | null;

    @Column("varchar", { name: "FACTRANS", nullable: true, length: 4 })
    factrans: string | null;

    @Column("varchar", { name: "FODTRANS", nullable: true, length: 3 })
    fodtrans: string | null;

    @Column("varchar", { name: "CHOL", nullable: true, length: 5 })
    chol: string | null;

    @Column("varchar", { name: "SODIUM", nullable: true, length: 5 })
    sodium: string | null;

    @Column("varchar", { name: "K", nullable: true, length: 5 })
    k: string | null;

    @Column("varchar", { name: "CA", nullable: true, length: 4 })
    ca: string | null;

    @Column("varchar", { name: "MG", nullable: true, length: 3 })
    mg: string | null;

    @Column("varchar", { name: "P", nullable: true, length: 4 })
    p: string | null;

    @Column("varchar", { name: "FE", nullable: true, length: 5 })
    fe: string | null;

    @Column("varchar", { name: "CU", nullable: true, length: 4 })
    cu: string | null;

    @Column("varchar", { name: "ZN", nullable: true, length: 3 })
    zn: string | null;

    @Column("varchar", { name: "CL", nullable: true, length: 5 })
    cl: string | null;

    @Column("varchar", { name: "MN", nullable: true, length: 4 })
    mn: string | null;

    @Column("varchar", { name: "SE", nullable: true, length: 3 })
    se: string | null;

    @Column("varchar", { name: "I", nullable: true, length: 6 })
    i: string | null;

    @Column("varchar", { name: "RET", nullable: true, length: 5 })
    ret: string | null;

    @Column("varchar", { name: "CAREQU", nullable: true, length: 5 })
    carequ: string | null;

    @Column("varchar", { name: "RETEQU", nullable: true, length: 18 })
    retequ: string | null;

    @Column("varchar", { name: "VITD", nullable: true, length: 4 })
    vitd: string | null;

    @Column("varchar", { name: "VITE", nullable: true, length: 5 })
    vite: string | null;

    @Column("varchar", { name: "VITK1", nullable: true, length: 5 })
    vitk1: string | null;

    @Column("varchar", { name: "THIA", nullable: true, length: 6 })
    thia: string | null;

    @Column("varchar", { name: "RIBO", nullable: true, length: 6 })
    ribo: string | null;

    @Column("varchar", { name: "NIAC", nullable: true, length: 5 })
    niac: string | null;

    @Column("varchar", { name: "TRYP60", nullable: true, length: 6 })
    tryp60: string | null;

    @Column("varchar", { name: "NIACEQU", nullable: true, length: 19 })
    niacequ: string | null;

    @Column("varchar", { name: "VITB6", nullable: true, length: 3 })
    vitb6: string | null;

    @Column("varchar", { name: "VITB12", nullable: true, length: 4 })
    vitb12: string | null;

    @Column("varchar", { name: "FOLT", nullable: true, length: 4 })
    folt: string | null;

    @Column("varchar", { name: "PANTO", nullable: true, length: 4 })
    panto: string | null;

    @Column("varchar", { name: "BIOT", nullable: true, length: 4 })
    biot: string | null;

    @Column("varchar", { name: "VITC", nullable: true, length: 4 })
    vitc: string | null;

    @Column("varchar", { name: "ALTRET", nullable: true, length: 5 })
    altret: string | null;

    @Column("varchar", { name: "13CISRET", nullable: true, length: 4 })
    _13Cisret: string | null;

    @Column("varchar", { name: "DEHYRET", nullable: true, length: 1 })
    dehyret: string | null;

    @Column("varchar", { name: "RETALD", nullable: true, length: 2 })
    retald: string | null;

    @Column("varchar", { name: "ACAR", nullable: true, length: 4 })
    acar: string | null;

    @Column("varchar", { name: "BCAR", nullable: true, length: 5 })
    bcar: string | null;

    @Column("varchar", { name: "CRYPT", nullable: true, length: 4 })
    crypt: string | null;

    @Column("varchar", { name: "LUT", nullable: true, length: 5 })
    lut: string | null;

    @Column("varchar", { name: "LYCO", nullable: true, length: 5 })
    lyco: string | null;

    @Column("varchar", { name: "25OHD3", nullable: true, length: 3 })
    _25Ohd3: string | null;

    @Column("varchar", { name: "VITD3", nullable: true, length: 4 })
    vitd3: string | null;

    @Column("varchar", { name: "5METHF", nullable: true, length: 3 })
    _5Methf: string | null;

    @Column("varchar", { name: "ATOPH", nullable: true, length: 5 })
    atoph: string | null;

    @Column("varchar", { name: "BTOPH", nullable: true, length: 3 })
    btoph: string | null;

    @Column("varchar", { name: "DTOPH", nullable: true, length: 4 })
    dtoph: string | null;

    @Column("varchar", { name: "GTOPH", nullable: true, length: 4 })
    gtoph: string | null;

    @Column("varchar", { name: "ATOTR", nullable: true, length: 4 })
    atotr: string | null;

    @Column("varchar", { name: "GTOTR", nullable: true, length: 3 })
    gtotr: string | null;

    @Column("varchar", { name: "FAC40", nullable: true, length: 3 })
    fac40: string | null;

    @Column("varchar", { name: "FAC60", nullable: true, length: 4 })
    fac60: string | null;

    @Column("varchar", { name: "FAC80", nullable: true, length: 4 })
    fac80: string | null;

    @Column("varchar", { name: "FAC100", nullable: true, length: 3 })
    fac100: string | null;

    @Column("varchar", { name: "FAC110xb", nullable: true, length: 3 })
    fac110xb: string | null;

    @Column("varchar", { name: "FAC120", nullable: true, length: 4 })
    fac120: string | null;

    @Column("varchar", { name: "FAC120xb", nullable: true, length: 4 })
    fac120xb: string | null;

    @Column("varchar", { name: "FAC130", nullable: true, length: 3 })
    fac130: string | null;

    @Column("varchar", { name: "FAC130xb", nullable: true, length: 2 })
    fac130xb: string | null;

    @Column("varchar", { name: "FAC140", nullable: true, length: 4 })
    fac140: string | null;

    @Column("varchar", { name: "FAC140xb", nullable: true, length: 4 })
    fac140xb: string | null;

    @Column("varchar", { name: "FAC150", nullable: true, length: 4 })
    fac150: string | null;

    @Column("varchar", { name: "FAC150xb", nullable: true, length: 3 })
    fac150xb: string | null;

    @Column("varchar", { name: "FAC160", nullable: true, length: 4 })
    fac160: string | null;

    @Column("varchar", { name: "FAC160xb", nullable: true, length: 4 })
    fac160xb: string | null;

    @Column("varchar", { name: "FAC170", nullable: true, length: 4 })
    fac170: string | null;

    @Column("varchar", { name: "FAC170xb", nullable: true, length: 4 })
    fac170xb: string | null;

    @Column("varchar", { name: "FAC180", nullable: true, length: 4 })
    fac180: string | null;

    @Column("varchar", { name: "FAC180xb", nullable: true, length: 4 })
    fac180xb: string | null;

    @Column("varchar", { name: "FAC190", nullable: true, length: 10 })
    fac190: string | null;

    @Column("varchar", { name: "FAC200", nullable: true, length: 4 })
    fac200: string | null;

    @Column("varchar", { name: "FAC200xb", nullable: true, length: 3 })
    fac200xb: string | null;

    @Column("varchar", { name: "FAC220", nullable: true, length: 3 })
    fac220: string | null;

    @Column("varchar", { name: "FAC220xb", nullable: true, length: 4 })
    fac220xb: string | null;

    @Column("varchar", { name: "FAC240", nullable: true, length: 3 })
    fac240: string | null;

    @Column("varchar", { name: "FAC240xb", nullable: true, length: 3 })
    fac240xb: string | null;

    @Column("varchar", { name: "FAC250xb", nullable: true, length: 3 })
    fac250xb: string | null;

    @Column("varchar", { name: "FOD40", nullable: true, length: 6 })
    fod40: string | null;

    @Column("varchar", { name: "FOD60", nullable: true, length: 6 })
    fod60: string | null;

    @Column("varchar", { name: "FOD80", nullable: true, length: 6 })
    fod80: string | null;

    @Column("varchar", { name: "FOD100", nullable: true, length: 6 })
    fod100: string | null;

    @Column("varchar", { name: "FOD110xb", nullable: true, length: 3 })
    fod110xb: string | null;

    @Column("varchar", { name: "FOD120", nullable: true, length: 4 })
    fod120: string | null;

    @Column("varchar", { name: "FOD120xb", nullable: true, length: 6 })
    fod120xb: string | null;

    @Column("varchar", { name: "FOD130", nullable: true, length: 4 })
    fod130: string | null;

    @Column("varchar", { name: "FOD130xb", nullable: true, length: 3 })
    fod130xb: string | null;

    @Column("varchar", { name: "FOD140", nullable: true, length: 4 })
    fod140: string | null;

    @Column("varchar", { name: "FOD140xb", nullable: true, length: 6 })
    fod140xb: string | null;

    @Column("varchar", { name: "FOD150", nullable: true, length: 3 })
    fod150: string | null;

    @Column("varchar", { name: "FOD150xb", nullable: true, length: 6 })
    fod150xb: string | null;

    @Column("varchar", { name: "FOD160", nullable: true, length: 4 })
    fod160: string | null;

    @Column("varchar", { name: "FOD160xb", nullable: true, length: 6 })
    fod160xb: string | null;

    @Column("varchar", { name: "FOD170", nullable: true, length: 3 })
    fod170: string | null;

    @Column("varchar", { name: "FOD170xb", nullable: true, length: 6 })
    fod170xb: string | null;

    @Column("varchar", { name: "FOD180", nullable: true, length: 4 })
    fod180: string | null;

    @Column("varchar", { name: "FOD180xb", nullable: true, length: 6 })
    fod180xb: string | null;

    @Column("varchar", { name: "FOD190", nullable: true, length: 3 })
    fod190: string | null;

    @Column("varchar", { name: "FOD200", nullable: true, length: 4 })
    fod200: string | null;

    @Column("varchar", { name: "FOD200xb", nullable: true, length: 6 })
    fod200xb: string | null;

    @Column("varchar", { name: "FOD220", nullable: true, length: 3 })
    fod220: string | null;

    @Column("varchar", { name: "FOD220xb", nullable: true, length: 6 })
    fod220xb: string | null;

    @Column("varchar", { name: "FOD240", nullable: true, length: 3 })
    fod240: string | null;

    @Column("varchar", { name: "FOD240xb", nullable: true, length: 6 })
    fod240xb: string | null;

    @Column("varchar", { name: "FOD250xb", nullable: true, length: 3 })
    fod250xb: string | null;

    @Column("varchar", { name: "FAC101", nullable: true, length: 3 })
    fac101: string | null;

    @Column("varchar", { name: "FAC101c", nullable: true, length: 3 })
    fac101c: string | null;

    @Column("varchar", { name: "FAC121", nullable: true, length: 3 })
    fac121: string | null;

    @Column("varchar", { name: "FAC121c", nullable: true, length: 3 })
    fac121c: string | null;

    @Column("varchar", { name: "FAC141", nullable: true, length: 3 })
    fac141: string | null;

    @Column("varchar", { name: "FAC141c", nullable: true, length: 3 })
    fac141c: string | null;

    @Column("varchar", { name: "FAC151", nullable: true, length: 3 })
    fac151: string | null;

    @Column("varchar", { name: "FAC151c", nullable: true, length: 6 })
    fac151c: string | null;

    @Column("varchar", { name: "FAC161", nullable: true, length: 3 })
    fac161: string | null;

    @Column("varchar", { name: "FAC161c", nullable: true, length: 4 })
    fac161c: string | null;

    @Column("varchar", { name: "FAC171", nullable: true, length: 3 })
    fac171: string | null;

    @Column("varchar", { name: "FAC171c", nullable: true, length: 3 })
    fac171c: string | null;

    @Column("varchar", { name: "FAC181", nullable: true, length: 4 })
    fac181: string | null;

    @Column("varchar", { name: "FAC181c", nullable: true, length: 4 })
    fac181c: string | null;

    @Column("varchar", { name: "FAC181n9", nullable: true, length: 4 })
    fac181n9: string | null;

    @Column("varchar", { name: "FAC181n7", nullable: true, length: 4 })
    fac181n7: string | null;

    @Column("varchar", { name: "FAC201", nullable: true, length: 4 })
    fac201: string | null;

    @Column("varchar", { name: "FAC201c", nullable: true, length: 4 })
    fac201c: string | null;

    @Column("varchar", { name: "FAC221", nullable: true, length: 4 })
    fac221: string | null;

    @Column("varchar", { name: "FAC221c", nullable: true, length: 4 })
    fac221c: string | null;

    @Column("varchar", { name: "FAC221n11", nullable: true, length: 4 })
    fac221n11: string | null;

    @Column("varchar", { name: "FAC221n9", nullable: true, length: 4 })
    fac221n9: string | null;

    @Column("varchar", { name: "FAC241", nullable: true, length: 3 })
    fac241: string | null;

    @Column("varchar", { name: "FAC241c", nullable: true, length: 3 })
    fac241c: string | null;

    @Column("varchar", { name: "MONOFACtr", nullable: true, length: 4 })
    monofaCtr: string | null;

    @Column("varchar", { name: "FOD101", nullable: true, length: 3 })
    fod101: string | null;

    @Column("varchar", { name: "FOD101c", nullable: true, length: 3 })
    fod101c: string | null;

    @Column("varchar", { name: "FOD121", nullable: true, length: 3 })
    fod121: string | null;

    @Column("varchar", { name: "FOD121c", nullable: true, length: 3 })
    fod121c: string | null;

    @Column("varchar", { name: "FOD141", nullable: true, length: 3 })
    fod141: string | null;

    @Column("varchar", { name: "FOD141c", nullable: true, length: 3 })
    fod141c: string | null;

    @Column("varchar", { name: "FOD151", nullable: true, length: 3 })
    fod151: string | null;

    @Column("varchar", { name: "FOD151c", nullable: true, length: 3 })
    fod151c: string | null;

    @Column("varchar", { name: "FOD161", nullable: true, length: 4 })
    fod161: string | null;

    @Column("varchar", { name: "FOD161c", nullable: true, length: 4 })
    fod161c: string | null;

    @Column("varchar", { name: "FOD171", nullable: true, length: 4 })
    fod171: string | null;

    @Column("varchar", { name: "FOD171c", nullable: true, length: 3 })
    fod171c: string | null;

    @Column("varchar", { name: "FOD181", nullable: true, length: 5 })
    fod181: string | null;

    @Column("varchar", { name: "FOD181c", nullable: true, length: 5 })
    fod181c: string | null;

    @Column("varchar", { name: "FOD181n9", nullable: true, length: 4 })
    fod181n9: string | null;

    @Column("varchar", { name: "FOD181n7", nullable: true, length: 4 })
    fod181n7: string | null;

    @Column("varchar", { name: "FOD201", nullable: true, length: 4 })
    fod201: string | null;

    @Column("varchar", { name: "FOD201c", nullable: true, length: 4 })
    fod201c: string | null;

    @Column("varchar", { name: "FOD221", nullable: true, length: 4 })
    fod221: string | null;

    @Column("varchar", { name: "FOD221c", nullable: true, length: 4 })
    fod221c: string | null;

    @Column("varchar", { name: "FOD221n11", nullable: true, length: 3 })
    fod221n11: string | null;

    @Column("varchar", { name: "FOD221n9", nullable: true, length: 3 })
    fod221n9: string | null;

    @Column("varchar", { name: "FOD241", nullable: true, length: 3 })
    fod241: string | null;

    @Column("varchar", { name: "FOD241c", nullable: true, length: 3 })
    fod241c: string | null;

    @Column("varchar", { name: "MONOFODtr", nullable: true, length: 3 })
    monofoDtr: string | null;

    @Column("varchar", { name: "FAC162", nullable: true, length: 10 })
    fac162: string | null;

    @Column("varchar", { name: "FAC162c", nullable: true, length: 10 })
    fac162c: string | null;

    @Column("varchar", { name: "FAC163c", nullable: true, length: 3 })
    fac163c: string | null;

    @Column("varchar", { name: "FAC164", nullable: true, length: 3 })
    fac164: string | null;

    @Column("varchar", { name: "FAC164c", nullable: true, length: 3 })
    fac164c: string | null;

    @Column("varchar", { name: "FAC16 poly", nullable: true, length: 10 })
    fac16Poly: string | null;

    @Column("varchar", { name: "FAC182", nullable: true, length: 4 })
    fac182: string | null;

    @Column("varchar", { name: "FAC182cn6", nullable: true, length: 4 })
    fac182cn6: string | null;

    @Column("varchar", { name: "FAC183", nullable: true, length: 4 })
    fac183: string | null;

    @Column("varchar", { name: "FAC183cn3", nullable: true, length: 4 })
    fac183cn3: string | null;

    @Column("varchar", { name: "FAC183cn6", nullable: true, length: 4 })
    fac183cn6: string | null;

    @Column("varchar", { name: "FAC184", nullable: true, length: 3 })
    fac184: string | null;

    @Column("varchar", { name: "FAC184cn3", nullable: true, length: 3 })
    fac184cn3: string | null;

    @Column("varchar", { name: "FAC18 poly", nullable: true, length: 4 })
    fac18Poly: string | null;

    @Column("varchar", { name: "FAC202", nullable: true, length: 3 })
    fac202: string | null;

    @Column("varchar", { name: "FAC202cn6", nullable: true, length: 3 })
    fac202cn6: string | null;

    @Column("varchar", { name: "FAC203", nullable: true, length: 3 })
    fac203: string | null;

    @Column("varchar", { name: "FAC203cn6", nullable: true, length: 4 })
    fac203cn6: string | null;

    @Column("varchar", { name: "FAC204", nullable: true, length: 3 })
    fac204: string | null;

    @Column("varchar", { name: "FAC204cn6", nullable: true, length: 3 })
    fac204cn6: string | null;

    @Column("varchar", { name: "FAC205", nullable: true, length: 4 })
    fac205: string | null;

    @Column("varchar", { name: "FAC205cn3", nullable: true, length: 4 })
    fac205cn3: string | null;

    @Column("varchar", { name: "FAC20 poly", nullable: true, length: 3 })
    fac20Poly: string | null;

    @Column("varchar", { name: "FAC215", nullable: true, length: 3 })
    fac215: string | null;

    @Column("varchar", { name: "FAC215cn3", nullable: true, length: 3 })
    fac215cn3: string | null;

    @Column("varchar", { name: "FAC222", nullable: true, length: 3 })
    fac222: string | null;

    @Column("varchar", { name: "FAC222cn6", nullable: true, length: 3 })
    fac222cn6: string | null;

    @Column("varchar", { name: "FAC223cn6", nullable: true, length: 3 })
    fac223cn6: string | null;

    @Column("varchar", { name: "FAC224", nullable: true, length: 3 })
    fac224: string | null;

    @Column("varchar", { name: "FAC224cn6", nullable: true, length: 3 })
    fac224cn6: string | null;

    @Column("varchar", { name: "FAC225", nullable: true, length: 3 })
    fac225: string | null;

    @Column("varchar", { name: "FAC225cn3", nullable: true, length: 3 })
    fac225cn3: string | null;

    @Column("varchar", { name: "FAC226", nullable: true, length: 4 })
    fac226: string | null;

    @Column("varchar", { name: "FAC226cn3", nullable: true, length: 4 })
    fac226cn3: string | null;

    @Column("varchar", { name: "FAC22 poly", nullable: true, length: 3 })
    fac22Poly: string | null;

    @Column("varchar", { name: "POLYFACtr", nullable: true, length: 3 })
    polyfaCtr: string | null;

    @Column("varchar", { name: "FOD162", nullable: true, length: 3 })
    fod162: string | null;

    @Column("varchar", { name: "FOD162c", nullable: true, length: 3 })
    fod162c: string | null;

    @Column("varchar", { name: "FOD163", nullable: true, length: 3 })
    fod163: string | null;

    @Column("varchar", { name: "FOD164", nullable: true, length: 3 })
    fod164: string | null;

    @Column("varchar", { name: "FOD164c", nullable: true, length: 3 })
    fod164c: string | null;

    @Column("varchar", { name: "FOD16 poly", nullable: true, length: 3 })
    fod16Poly: string | null;

    @Column("varchar", { name: "FOD182", nullable: true, length: 5 })
    fod182: string | null;

    @Column("varchar", { name: "FOD182cn6", nullable: true, length: 4 })
    fod182cn6: string | null;

    @Column("varchar", { name: "FOD183", nullable: true, length: 4 })
    fod183: string | null;

    @Column("varchar", { name: "FOD183cn3", nullable: true, length: 4 })
    fod183cn3: string | null;

    @Column("varchar", { name: "FOD183cn6", nullable: true, length: 3 })
    fod183cn6: string | null;

    @Column("varchar", { name: "FOD184", nullable: true, length: 3 })
    fod184: string | null;

    @Column("varchar", { name: "FOD184cn3", nullable: true, length: 3 })
    fod184cn3: string | null;

    @Column("varchar", { name: "FOD18 poly", nullable: true, length: 3 })
    fod18Poly: string | null;

    @Column("varchar", { name: "FOD202", nullable: true, length: 3 })
    fod202: string | null;

    @Column("varchar", { name: "FOD202cn6", nullable: true, length: 3 })
    fod202cn6: string | null;

    @Column("varchar", { name: "FOD203", nullable: true, length: 3 })
    fod203: string | null;

    @Column("varchar", { name: "FOD203cn6", nullable: true, length: 3 })
    fod203cn6: string | null;

    @Column("varchar", { name: "FOD204", nullable: true, length: 3 })
    fod204: string | null;

    @Column("varchar", { name: "FOD204cn6", nullable: true, length: 3 })
    fod204cn6: string | null;

    @Column("varchar", { name: "FOD205", nullable: true, length: 3 })
    fod205: string | null;

    @Column("varchar", { name: "FOD205cn3", nullable: true, length: 4 })
    fod205cn3: string | null;

    @Column("varchar", { name: "FOD20 poly", nullable: true, length: 3 })
    fod20Poly: string | null;

    @Column("varchar", { name: "FOD215", nullable: true, length: 3 })
    fod215: string | null;

    @Column("varchar", { name: "FOD215cn3", nullable: true, length: 3 })
    fod215cn3: string | null;

    @Column("varchar", { name: "FOD222", nullable: true, length: 3 })
    fod222: string | null;

    @Column("varchar", { name: "FOD222cn6", nullable: true, length: 3 })
    fod222cn6: string | null;

    @Column("varchar", { name: "FOD223cn6", nullable: true, length: 3 })
    fod223cn6: string | null;

    @Column("varchar", { name: "FOD224", nullable: true, length: 3 })
    fod224: string | null;

    @Column("varchar", { name: "FOD224cn6", nullable: true, length: 3 })
    fod224cn6: string | null;

    @Column("varchar", { name: "FOD225", nullable: true, length: 3 })
    fod225: string | null;

    @Column("varchar", { name: "FOD225cn3", nullable: true, length: 3 })
    fod225cn3: string | null;

    @Column("varchar", { name: "FOD226", nullable: true, length: 3 })
    fod226: string | null;

    @Column("varchar", { name: "FOD226cn3", nullable: true, length: 3 })
    fod226cn3: string | null;

    @Column("varchar", { name: "FOD22 poly", nullable: true, length: 3 })
    fod22Poly: string | null;

    @Column("varchar", { name: "POLYFODtr", nullable: true, length: 3 })
    polyfoDtr: string | null;

    @Column("varchar", { name: "Total PHYTO", nullable: true, length: 4 })
    totalPhyto: string | null;

    @Column("varchar", { name: "Other CHOL and PHYTO", nullable: true, length: 4 })
    otherCholAndPhyto: string | null;

    @Column("varchar", { name: "PHYTO", nullable: true, length: 4 })
    phyto: string | null;

    @Column("varchar", { name: "BSITPHYTO", nullable: true, length: 4 })
    bsitphyto: string | null;

    @Column("varchar", { name: "BRASPHYTO", nullable: true, length: 3 })
    brasphyto: string | null;

    @Column("varchar", { name: "CAMPHYTO", nullable: true, length: 4 })
    camphyto: string | null;

    @Column("varchar", { name: "D5AVEN", nullable: true, length: 3 })
    d5Aven: string | null;

    @Column("varchar", { name: "D7AVEN", nullable: true, length: 3 })
    d7Aven: string | null;

    @Column("varchar", { name: "D7STIG", nullable: true, length: 2 })
    d7Stig: string | null;

    @Column("varchar", { name: "STIGPHYTO", nullable: true, length: 3 })
    stigphyto: string | null;

    @Column("varchar", { name: "CITA", nullable: true, length: 2 })
    cita: string | null;

    @Column("varchar", { name: "MALA", nullable: true, length: 2 })
    mala: string | null;

    @Column("varchar", { name: "TimeInserted", nullable: true, length: 19 })
    timeInserted: string | null;

}
