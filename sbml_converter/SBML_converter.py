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
    #products = products_list.getAttribute("spiecesReference")
    final_products = {}
    for prod in products_list:
        stochio =prod.getAttribute("stoichiometry")
        final_products[prod.getAttribute("species")] = stochio
    return final_products

def getReactants(reactants_list):
    for r in reactants_list:
        react = r.getElementsByTagName("spiecesReference")
        print (len(react))
        for element in react:
            print(element)
        
    # stochio = react.getAttribute("stoichiometry")*(-1)
    # final_reactants[react.getAttribute("species")] = stochio
    # print (reactants_list)
    #return final_reactants
        
def getReactions(doc):
    reacts = doc.getElementsByTagName("reaction")
    reactions = []
    for re in reacts:
        reaction = {}
        products_list = re.getElementByTagName("listOfProducts")
        reactants_list = re.getElementsByTagName("listOfReactants")
        print (products_list.lenght)
        products = getProducts(products_list)
        # reactants = getReactants(reactants_list)
        # mets = reactants
        reaction["id"] =  re.getAttribute("id")
        reaction["name"] = re.getAttribute("name")
        # reaction["metabolites"] = mets
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