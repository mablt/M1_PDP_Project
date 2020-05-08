import xml.dom.minidom
import json



def getMetabolites(doc):
    species = doc.getElementsByTagName("species")
    metabolites = []
    for sp in species:
        metabolite ={}
        metabolite["id"] = sp.getAttribute("id")
        metabolite["name"] = sp.getAttribute("name")
        metabolite["compartment"]=sp.getAttribute("compartment")
        metabolite["charge"]=sp.getAttribute("fbc:charge")
        metabolite["formula"]=sp.getAttribute("fbc:chemicalFormula")
        metabolites.append(metabolite)
    return metabolites


def getProducts(products_list):
    final_products = {}
    for prod in products_list:
        products = prod.getElementsByTagName("speciesReference")
        for p in products:
            final_products[p.getAttribute("species")]=float(p.getAttribute("stoichiometry"))
    return final_products

def getReactants(reactants_list):
    final_reactants = {}
    for react in reactants_list:
        reactants = react.getElementsByTagName("speciesReference")
        for r in reactants:
            stoichio = - float(r.getAttribute("stoichiometry"))
            final_reactants[r.getAttribute("species")] = stoichio
    return final_reactants
        
def getReactions(doc):
    reacts = doc.getElementsByTagName("reaction")
    reactions = []
    for re in reacts:
        reaction = {}
        products_list = re.getElementsByTagName("listOfProducts")
        products = getProducts(products_list)
        reactants_list = re.getElementsByTagName("listOfReactants")
        reactants = getReactants(reactants_list)
        reactants.update(products)
        reaction["id"] =  re.getAttribute("id")
        reaction["name"] = re.getAttribute("name")
        reaction["metabolites"] = reactants
        #reaction["lower_bound"]= re.getAttribute("fbc:lowerFluxBound")
        #reaction["upper_bound"]=re.getAttribute("fbc:upperFluxBound")
        #reaction["gene_reaction_rule"]=
        #reaction["subsystem"]=
        reactions.append(reaction)
    return reactions

def getCompartments(doc):
    comparts= doc.getElementsByTagName("compartment")
    compartments = {}
    for comp in comparts:
        compartments[comp.getAttribute("id")] = comp.getAttribute("name")
    return compartments


def createJSON(doc):
    json ={} 
    metabolites = getMetabolites(doc)
    reactions = getReactions(doc)
    compartments = getCompartments(doc)
    json["metabolites"] = metabolites
    json["reactions"]=reactions
    json["id"] = doc.getElementsByTagName("model")[0].getAttribute("id")
    json["compartments"] = compartments
    json["version"]= "1"

    return json


#MAIN
doc = xml.dom.minidom.parse("e_coli_core.xml")
json_file = createJSON(doc)
fileName = json_file["id"] + ".json"
with open (fileName,'w') as outfile:
    json.dump(json_file,outfile)